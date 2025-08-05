import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String, 
    required: true
  },
  techStack: [String],
  githubLink: {
    type: String,
  },
  liveDemo: {
    type: String,
  },
  imageUrl: {
    type: String, // cloudinary image url
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Project = mongoose.model("Project", projectSchema);
