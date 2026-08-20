import express from "express";
import {
  createStory,
  togglePublish,
  deleteStory,
  updateStory,
  getAllStories
} from "../controller/ImpactStory.controller.js";
import upload from "../middleware/uploadImpactMedia.js";

const router = express.Router();

const mediaFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

router.post("/impact", mediaFields, createStory);
router.get("/impact", getAllStories);
router.patch("/impact/:id/publish", togglePublish);
router.put("/impact/:id", mediaFields, updateStory);
router.delete("/impact/:id", deleteStory);

export default router;