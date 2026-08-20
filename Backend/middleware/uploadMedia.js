import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp"];
const VIDEO_FORMATS = ["mp4", "mov", "avi", "mkv", "webm"];

// A single "media" field that can be EITHER an image or a video —
// resource_type is picked per-file based on its actual mimetype.
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isVideo = file.mimetype.startsWith("video");
    return {
      folder: "Stories",
      resource_type: isVideo ? "video" : "image",
      allowed_formats: isVideo ? VIDEO_FORMATS : IMAGE_FORMATS,
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB — covers short video clips too
});

// Raw multer instance — supports upload.single("media"), upload.array(...), etc.
export default upload;