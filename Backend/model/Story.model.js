import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String },
    description: { type: String, required: true },

    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], required: true },

    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Story", storySchema);
