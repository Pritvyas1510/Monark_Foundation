import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({

  name: { type: String, required: true },

  phone: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },

  email: { 
    type: String, 
    unique: true, 
    sparse: true 
  },

  gender: { type: String },

  dob: { type: Date },

  bloodGroup: { type: String },

  language: [{ 
    type: String, 
    default: "English" 
  }],

  address: { type: String },

  city: { type: String },

  region: { type: String },

  photoUrl: { type: String },

  membershipId: { 
    type: String, 
    unique: true, 
    required: true,
    // sparse: true, 
    index: true 
  },

  joinedOn: { 
    type: Date, 
    default: Date.now 
  },

  // 🧠 APPLY FOR HEAD ROLE
  interestedInHead: { 
    type: Boolean, 
    default: false 
  },

  // ⏳ pending | approved | rejected
  headStatus: { 
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  },

  // 👑 TRUE WHEN APPROVED
  isHead: { 
    type: Boolean, 
    default: false 
  },

  idCardUrl: { type: String },

  isVerified: { 
    type: Boolean, 
    default: false 
  },

}, { timestamps: true });

export default mongoose.model("Member", MemberSchema);
