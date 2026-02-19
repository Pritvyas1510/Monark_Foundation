import { Admin } from "../model/Admin.model.js";
import Member from "../model/Member.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import formatDOBPassword from "../utils/formatDOBPassword.js"


/* ===================== ADMIN LOGIN ===================== */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Email not found" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    admin.lastlogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: admin.role,
      name: admin.name,
      email: admin.email,
      lastLogin: admin.lastlogin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const makeSubAdmin = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member)
      return res.status(404).json({ message: "Member not found" });

    if (!member.dob)
      return res.status(400).json({ message: "DOB missing for member" });

    // 🔐 username
    const username = member.email || `${member.phone}@monark.com`;

    // ❗ prevent duplicate admin
    const existingAdmin = await Admin.findOne({ email: username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // 📆 password from DOB
    const rawPassword = formatDOBPassword(member.dob);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // 👑 create admin
    await Admin.create({
      name: member.name,
      email: username,
      password: hashedPassword,
      role: "sub_admin",
      createdBy: req.user?.id || null,
    });

    // update member
    member.isHead = true;
    member.headStatus = "approved";
    await member.save();

    res.json({
      message: "Sub Admin created successfully",
      login: {
        username,
        password: rawPassword,
      },
    });

  } catch (err) {
    console.error("MAKE SUB ADMIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

