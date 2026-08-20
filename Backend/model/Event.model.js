import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    eventType: {
      type: String,
      enum: ["Online", "Offline", "Hybrid"],
      required: true,
      default: "Offline",
    },
    // Google Meet / Teams / Zoom link — relevant when eventType is Online or Hybrid
    meetingLink: { type: String, trim: true },
    shortDescription: { type: String, trim: true },
    description: { type: String, required: true },

    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },

    venue: {
      type: String,
      required: function () {
        return this.eventType !== "Online";
      },
      trim: true,
    },
    address: { type: String, trim: true },
    googleMapLink: { type: String, trim: true },

    // Only used when eventType is "Online" or "Hybrid" — a Google Meet /
    // MS Teams / Zoom link, etc.
    meetingLink: { type: String, trim: true },

    organizedBy: { type: String, required: true, trim: true },
    contactPerson: { type: String, trim: true },
    contactNumber: { type: String, trim: true },
    contactEmail: { type: String, trim: true, lowercase: true },

    // Single required cover media — can be an image OR a short video
    bannerImage: { type: String, required: true },
    bannerType: { type: String, enum: ["image", "video"], default: "image" },

    // Extra images shown in the event gallery
    galleryImages: { type: [String], default: [] },

    // Bullet-point style highlights ("Free entry", "Live music", etc.)
    eventHighlights: { type: [String], default: [] },

    // Uploaded event video files (Cloudinary URLs)
    videoUrls: { type: [String], default: [] },

    status: {
      type: String,
      enum: ["Draft", "Published", "Cancelled", "Completed"],
      default: "Draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", EventSchema);