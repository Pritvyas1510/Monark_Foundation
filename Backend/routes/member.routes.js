import express from "express";
import upload from "../middleware/uploadMemberImage.js";

import {
  registerMember,
  getAllMembers,
  getMemberByPhone,
  updateMember,
  deleteMember,
} from "../controller/member.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// router.post("/memberCreate", upload.single("photo"), registerMember);
// router.post("/memberCreate", registerMember);
router.post("/register", (req,res,next)=>{
  next();
}, upload.single("photo"), registerMember);

router.get("/", getAllMembers);

router.get("/phone/:phone", getMemberByPhone);

router.put("/:id", upload.single("photo"), updateMember);

router.delete("/:id",auth, deleteMember);

export default router;
