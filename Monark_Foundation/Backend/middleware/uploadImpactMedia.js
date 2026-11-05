import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; // adjust path to your cloudinary.js

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.fieldname === "video") {
      return {
        folder: "impact-stories/videos",
        resource_type: "video", // REQUIRED for video uploads to Cloudinary
        allowed_formats: ["mp4", "mov", "webm", "avi"],
      };
    }
    // image
    return {
      folder: "impact-stories/images",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image" && !file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed for 'image'"));
  }
  if (file.fieldname === "video" && !file.mimetype.startsWith("video/")) {
    return cb(new Error("Only video files are allowed for 'video'"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

export default upload;