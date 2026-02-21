import Member from "../model/Member.model.js";
import { Admin } from "../model/Admin.model.js";
import { generateMemberId } from "../utils/generateMemberId.js";

/* ===================== REGISTER ===================== */
export const registerMember = async (req, res) => {
  try {
    const data = { ...req.body };

    // Check duplicate phone
    const exists = await Member.findOne({ phone: data.phone });
    if (exists) {
      return res.status(400).json({ message: "Member already exists" });
    }

    // Boolean
    if (data.interestedInHead !== undefined) {
      data.interestedInHead =
        data.interestedInHead === "true" || data.interestedInHead === true;
    }

    // Date
    if (data.dob) {
      data.dob = new Date(data.dob);
    }

    // Language always array
    if (data.language && !Array.isArray(data.language)) {
      data.language = [data.language];
    }

    // Photo
    if (req.file?.path) {
      data.photoUrl = req.file.path;
    }

    // Generate ID (ONLY here)
    data.membershipId = await generateMemberId();

    const member = await Member.create(data);

    res.status(201).json({
      message: "Member registered successfully",
      member,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Duplicate membership ID — please retry",
      });
    }

    res.status(500).json({ message: err.message });
  }
};

/* ===================== GET ALL ===================== */
export const getAllMembers = async (req, res) => {
  const members = await Member.find().sort({ createdAt: -1 });
  res.json(members);
};

/* ===================== FIND BY PHONE ===================== */
export const getMemberByPhone = async (req, res) => {
  const member = await Member.findOne({ phone: req.params.phone });

  if (!member) return res.status(404).json({ message: "Member not found" });

  res.json(member);
};

/* ===================== UPDATE ===================== */
export const updateMember = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.dob) {
      updateData.dob = new Date(updateData.dob);
    }

    if (updateData.interestedInHead !== undefined) {
      updateData.interestedInHead =
        updateData.interestedInHead === "true" ||
        updateData.interestedInHead === true;
    }

    if (req.file) {
      updateData.photoUrl = req.file.path;
    }

    const member = await Member.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only Admin can delete members",
      });
    }

    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // 🔥 If sub-admin → remove admin account also
    if (member.isHead === true) {
      await Admin.deleteOne({ email: member.email });
    }

    await Member.findByIdAndDelete(req.params.id);

    res.json({ message: "Member deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
