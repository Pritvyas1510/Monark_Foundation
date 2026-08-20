import express from "express";
import { eventUpload } from "../middleware/uploadEventMedia.js";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controller/Event.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { allowRoles } from "../middleware/checkRole.js";

const router = express.Router();

// CREATE EVENT
router.post(
  "/",
  adminAuth,
  allowRoles("admin"),
  eventUpload,
  createEvent
);

// GET ALL EVENTS
router.get("/", getEvents);

// GET SINGLE EVENT
router.get("/:id", getEventById);

// UPDATE EVENT
router.put(
  "/:id",
  adminAuth,
  allowRoles("admin"),
  eventUpload,
  updateEvent
);

// DELETE EVENT
router.delete(
  "/:id",
  adminAuth,
  allowRoles("admin"),
  deleteEvent
);

export default router;