import ImpactStory from "../model/ImpactStory.model.js";

export const createStory = async (req, res) => {
  try {
    const imageFile = req.files?.image?.[0];
    const videoFile = req.files?.video?.[0];

    if (!imageFile || !videoFile) {
      return res.status(400).json({ message: "Both image and video are required" });
    }

    const story = await ImpactStory.create({
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      peopleImpacted: req.body.peopleImpacted,
      availability: req.body.availability,
      imageUrl: imageFile.path,
      videoUrl: videoFile.path,
    });

    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStory = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      peopleImpacted: req.body.peopleImpacted,
      availability: req.body.availability,
    };

    const imageFile = req.files?.image?.[0];
    const videoFile = req.files?.video?.[0];

    if (imageFile) updatedData.imageUrl = imageFile.path;
    if (videoFile) updatedData.videoUrl = videoFile.path;

    const story = await ImpactStory.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllStories = async (req, res) => {
  try {
    const stories = await ImpactStory.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const story = await ImpactStory.findByIdAndUpdate(
      req.params.id,
      { isPublished: req.body.isPublished },
      { new: true }
    );
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStory = async (req, res) => {
  await ImpactStory.findByIdAndDelete(req.params.id);
  res.json({ message: "Story deleted" });
};