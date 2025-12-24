import express from "express";
import {
  adminLogin,
  getMembers,
  rejectMember,
  registerMember,
  promoteMemberToSubAdmin,
  deleteMember
} from "../controller/Admin.controller.js";

import { adminAuth } from "../middleware/adminAuth.js";
import { allowRoles } from "../middleware/checkRole.js";

const router = express.Router();

/* ================= ADMIN AUTH ================= */

// Admin login
router.post("/login", adminLogin);

/* ================= MEMBER ================= */

// Member register (PUBLIC)
router.post("/member/register", registerMember);

// Get all members (Admin & Sub Admin)
router.get(
  "/members",
  adminAuth,
  allowRoles("admin", "sub_admin"),
  getMembers
);

// Reject member (Admin only)
router.patch(
  "/member/:id/reject",
  adminAuth,
  allowRoles("admin"),
  rejectMember
);

// Promote member to Sub Admin (Admin only)
router.patch(
  "/member/:id/promote",
  adminAuth,
  allowRoles("admin"),
  promoteMemberToSubAdmin
);

// Delete member (Admin only)
router.delete(
  "/member/:id",
  adminAuth,
  allowRoles("admin"),
  deleteMember
);

export default router;
