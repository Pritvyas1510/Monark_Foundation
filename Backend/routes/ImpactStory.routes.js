import express from "express";
import {
  createStory,
  togglePublish,
  deleteStory,
  updateStory,
  getAllStories
} from "../controller/ImpactStory.controller.js";
import upload from "../middleware/uploadEventMedia.js";

const router = express.Router();

router.post("/impact", upload.single("image"), createStory);
router.get("/impact", getAllStories);
router.patch("/impact/:id/publish", togglePublish);
router.put("/impact/:id", upload.single("image"), updateStory);
router.delete("/impact/:id", deleteStory);

export default router;
