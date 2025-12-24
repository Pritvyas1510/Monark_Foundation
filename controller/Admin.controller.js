import { Admin } from "../model/Admin.model.js";
import { Member } from "../model/Member.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateMemberId } from "../utils/generateMemberId.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: "Email not found" });
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
    role: admin.role,
  });
};

export const registerMember = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const exists = await Member.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Member already exists" });
    }

    const { memberNumber, memberId } = await generateMemberId();

    const member = await Member.create({
      name,
      phone,
      email,
      memberNumber,
      memberId
    });

    res.json({
      message: "Member registered successfully",
      member
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIST MEMBERS
export const getMembers = async (req, res) => {
  const members = await Member.find();
  res.json(members);
};


export const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json({
      message: "Member removed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message , erroe :error.message});
  }
};

// REJECT MEMBER
export const rejectMember = async (req, res) => {
  const updated = await Member.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );
  res.json({ message: "Member rejected", updated });
};

// PROMOTE MEMBER TO SUB ADMIN
export const promoteMemberToSubAdmin = async (req, res) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Only Admin can promote member" });
  }

  const member = await Member.findById(req.params.id);

  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }

  if (member.status !== "active") {
    return res.status(400).json({ message: "Member must be approved first" });
  }

  // Check if already admin
  const exists = await Admin.findOne({ email: member.email });
  if (exists) {
    return res.status(400).json({ message: "Already an admin" });
  }

  // Default password for sub-admin (force change later)
  const hashedPassword = await bcrypt.hash("subadmin123", 10);

  const subAdmin = await Admin.create({
    name: member.name,
    email: member.email,
    password: hashedPassword,
    role: "sub_admin",
    createdBy: req.adminId,
  });

  res.json({
    message: "Member promoted to Sub Admin",
    subAdmin,
  });
};
