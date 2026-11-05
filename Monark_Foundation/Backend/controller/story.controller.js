import Story from "../model/Story.model.js";

export const createStory = async (req, res) => {
  try {
    const { title, name, role, description, isPublished } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Media file required" });
    }

    const story = await Story.create({
      title,
      name,
      role,
      description,
      mediaUrl: req.file.path,
      mediaType: req.file.mimetype.startsWith("video") ? "video" : "image",
      isPublished,
    });

    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getPublicStories = async (req, res) => {
  const stories = await Story.find({ isPublished: true }).sort({ createdAt: -1 });
  res.json(stories);
};

export const getAllStoriesAdmin = async (req, res) => {
  const stories = await Story.find().sort({ createdAt: -1 });
  res.json(stories);
};

export const updateStory = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.mediaUrl = req.file.path;
      data.mediaType = req.file.mimetype.startsWith("video")
        ? "video"
        : "image";
    }

    const story = await Story.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteStory = async (req, res) => {
  await Story.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};


export const togglePublishStory = async (req, res) => {
  try {
    const { isPublished } = req.body;

    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { isPublished },
      { new: true }
    );

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
