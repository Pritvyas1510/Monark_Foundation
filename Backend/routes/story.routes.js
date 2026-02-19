import express from "express";
import upload from "../middleware/uploadEventMedia.js";
import {
  createStory,
  getPublicStories,
  getAllStoriesAdmin,
  updateStory,
  deleteStory,
  togglePublishStory,
} from "../controller/story.controller.js";

import { auth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/checkRole.js";

const router = express.Router();

/* PUBLIC */
router.get("/public", getPublicStories);

/* ADMIN */
router.get("/", auth, allowRoles("admin"), getAllStoriesAdmin);

router.post(
  "/",
  auth,
  allowRoles("admin"),
  upload.single("media"),   // ✅ multer used here
  createStory
);

router.put("/:id", auth, allowRoles("admin"),upload.single("media") , updateStory);
router.delete("/:id", auth, allowRoles("admin"), deleteStory);
router.patch(
  "/:id",
  auth,
  allowRoles("admin"),
  togglePublishStory
);


export default router;
