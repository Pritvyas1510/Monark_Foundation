import mongoose from "mongoose";

const impactStorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  articleUrl: { type: String, required: true },

  peopleImpacted: Number,
  availability: String,

  isPublished: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model("ImpactStory", impactStorySchema);
