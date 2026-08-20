import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp"];
const VIDEO_FORMATS = ["mp4", "mov", "avi", "mkv", "webm"];

// Storage decides image vs video PER FILE, based on which field it came in
// on and its actual mimetype — so bannerImage can be either a photo or a
// short video, galleryImages stays photos only, and videos is video-only.
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    if (file.fieldname === "galleryImages") {
      return {
        folder: "Events/gallery",
        resource_type: "image",
        allowed_formats: IMAGE_FORMATS,
      };
    }

    if (file.fieldname === "videos") {
      return {
        folder: "Events/videos",
        resource_type: "video",
        allowed_formats: VIDEO_FORMATS,
      };
    }

    // bannerImage — accepts EITHER an image or a video file
    const isVideoFile = file.mimetype.startsWith("video");
    return {
      folder: "Events/banner",
      resource_type: isVideoFile ? "video" : "image",
      allowed_formats: isVideoFile ? VIDEO_FORMATS : IMAGE_FORMATS,
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB per file — videos need the room
});

// Accepts:
//  - bannerImage: exactly 1 file (image OR video)
//  - galleryImages: up to 10 image files
//  - videos: up to 5 video files
export const eventUpload = upload.fields([
  { name: "bannerImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 10 },
  { name: "videos", maxCount: 5 },
]);

export default eventUpload;