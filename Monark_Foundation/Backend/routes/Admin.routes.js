import express from "express";
import { adminLogin, makeSubAdmin } from "../controller/Admin.controller.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { allowRoles } from "../middleware/checkRole.js";

const router = express.Router();

router.post("/login", adminLogin);

router.post(
  "/make-sub-admin/:id",
  adminAuth,
  allowRoles("admin"),
  makeSubAdmin
);

export default router;
