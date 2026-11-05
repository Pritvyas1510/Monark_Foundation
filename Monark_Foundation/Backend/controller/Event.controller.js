import { Event } from "../model/Event.model.js";
import cloudinary from "../config/cloudinary.js";

/* -----------------------------------------------------------
   Helper: safely parse an array field that arrives as a JSON
   string inside multipart/form-data (e.g. eventHighlights,
   existingGalleryImages, existingVideoUrls)
----------------------------------------------------------- */
const parseArrayField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/* -----------------------------------------------------------
   Helper: derive { resourceType, publicId } from a stored
   Cloudinary URL so we can clean up old media when it's
   replaced/deleted. Works for both image and video URLs, e.g.
   https://res.cloudinary.com/<cloud>/video/upload/v123/Events/videos/abc.mp4
   https://res.cloudinary.com/<cloud>/image/upload/v123/Events/gallery/xyz.jpg
----------------------------------------------------------- */
const parseCloudinaryUrl = (url = "") => {
  const match = url.match(/\/(image|video)\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  if (!match) return null;
  return { resourceType: match[1], publicId: match[2] };
};

const destroySafely = async (url) => {
  const parsed = parseCloudinaryUrl(url);
  if (!parsed) return;
  try {
    await cloudinary.uploader.destroy(parsed.publicId, {
      resource_type: parsed.resourceType,
    });
  } catch {
    // Non-fatal — media cleanup should never break the request
  }
};

/* =======================
   CREATE EVENT
======================= */
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      category,
      eventType,
      meetingLink,
      shortDescription,
      description,
      date,
      startTime,
      endTime,
      venue,
      address,
      googleMapLink,
      organizedBy,
      contactPerson,
      contactNumber,
      contactEmail,
      status,
    } = req.body;

    if (!req.files?.bannerImage?.[0]) {
      return res.status(400).json({ message: "Banner image or video is required" });
    }

    const bannerFile = req.files.bannerImage[0];
    const bannerImage = bannerFile.path;
    const bannerType = bannerFile.mimetype.startsWith("video") ? "video" : "image";

    const galleryImages = (req.files.galleryImages || []).map((f) => f.path);
    const videoUrls = (req.files.videos || []).map((f) => f.path);

    const eventHighlights = parseArrayField(req.body.eventHighlights);

    const event = await Event.create({
      title,
      category,
      eventType,
      meetingLink,
      shortDescription,
      description,
      date,
      startTime,
      endTime,
      venue,
      address,
      googleMapLink,
      organizedBy,
      contactPerson,
      contactNumber,
      contactEmail,
      bannerImage,
      bannerType,
      galleryImages,
      eventHighlights,
      videoUrls,
      status: status || "Draft",
      createdBy: req.adminId,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   UPDATE EVENT
======================= */
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const {
      title,
      category,
      eventType,
      meetingLink,
      shortDescription,
      description,
      date,
      startTime,
      endTime,
      venue,
      address,
      googleMapLink,
      organizedBy,
      contactPerson,
      contactNumber,
      contactEmail,
      status,
    } = req.body;

    // Text fields
    event.title = title ?? event.title;
    event.category = category ?? event.category;
    event.eventType = eventType ?? event.eventType;
    event.meetingLink = meetingLink ?? event.meetingLink;
    event.shortDescription = shortDescription ?? event.shortDescription;
    event.description = description ?? event.description;
    event.date = date ?? event.date;
    event.startTime = startTime ?? event.startTime;
    event.endTime = endTime ?? event.endTime;
    event.venue = venue ?? event.venue;
    event.address = address ?? event.address;
    event.googleMapLink = googleMapLink ?? event.googleMapLink;
    event.organizedBy = organizedBy ?? event.organizedBy;
    event.contactPerson = contactPerson ?? event.contactPerson;
    event.contactNumber = contactNumber ?? event.contactNumber;
    event.contactEmail = contactEmail ?? event.contactEmail;
    event.status = status ?? event.status;

    // Highlights — only touched if the frontend actually sent it
    if (req.body.eventHighlights !== undefined) {
      event.eventHighlights = parseArrayField(req.body.eventHighlights);
    }

    // Banner — replace + delete old one from Cloudinary (works whether
    // the old/new banner is an image or a video)
    if (req.files?.bannerImage?.[0]) {
      await destroySafely(event.bannerImage);
      const bannerFile = req.files.bannerImage[0];
      event.bannerImage = bannerFile.path;
      event.bannerType = bannerFile.mimetype.startsWith("video") ? "video" : "image";
    }

    // Gallery images:
    // - existingGalleryImages: JSON array of URLs the admin chose to KEEP
    // - any newly uploaded files are appended
    // - anything previously stored but not in "existing" gets deleted
    if (req.body.existingGalleryImages !== undefined) {
      const keep = parseArrayField(req.body.existingGalleryImages);
      const removed = event.galleryImages.filter((url) => !keep.includes(url));
      await Promise.all(removed.map(destroySafely));

      const newlyUploaded = (req.files?.galleryImages || []).map((f) => f.path);
      event.galleryImages = [...keep, ...newlyUploaded];
    } else if (req.files?.galleryImages?.length) {
      const newlyUploaded = req.files.galleryImages.map((f) => f.path);
      event.galleryImages = [...event.galleryImages, ...newlyUploaded];
    }

    // Videos — same keep/remove/append pattern as gallery images
    if (req.body.existingVideoUrls !== undefined) {
      const keep = parseArrayField(req.body.existingVideoUrls);
      const removed = event.videoUrls.filter((url) => !keep.includes(url));
      await Promise.all(removed.map(destroySafely));

      const newlyUploaded = (req.files?.videos || []).map((f) => f.path);
      event.videoUrls = [...keep, ...newlyUploaded];
    } else if (req.files?.videos?.length) {
      const newlyUploaded = req.files.videos.map((f) => f.path);
      event.videoUrls = [...event.videoUrls, ...newlyUploaded];
    }

    await event.save();

    res.json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   DELETE EVENT
======================= */
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Clean up Cloudinary media so storage doesn't fill up with orphans
    await Promise.all([
      destroySafely(event.bannerImage),
      ...event.galleryImages.map(destroySafely),
      ...event.videoUrls.map(destroySafely),
    ]);

    res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   GET ALL EVENTS
======================= */
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
   GET SINGLE EVENT
======================= */
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};