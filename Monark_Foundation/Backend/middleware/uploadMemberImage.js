// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "Foundation", // 👈 main folder
//     allowed_formats: ["jpg", "png", "jpeg"],
//     public_id: (req, file) =>
//       `member_${Date.now()}`, // unique file name
//   },
// });

// const upload = multer({ storage });

// export default upload;


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "Foundation",
    format: file.mimetype.split("/")[1], // jpg/png/jpeg
    public_id: `member_${Date.now()}`
  }),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
