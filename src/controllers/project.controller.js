import { Project } from "../models/project.model.js";
import cloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createProject = async (req, res, next) => {
  try {
    const { title, description, techStack, githubLink, liveDemo } = req.body;
    if (!req.body.title) {
      return res.status(400).json({ error: "Project title is required" });
    }
    if (!req.body.description) {
      return res.status(400).json({ error: "Project des is required" });
    }
    console.log(title);
    let imageUrl = "";

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "portfolio-projects" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const project = await Project.create({
  title: title?.trim(),
  description: description?.trim(),
  techStack: techStack?.split(",").map(t => t.trim()) || [],
  githubLink: githubLink?.trim(),
  liveDemo: liveDemo?.trim(),
  imageUrl,
});


    res.status(200).json(new ApiResponse(200, { project }, "Project created"));
  } catch (err) {
    next(err);
  }
};

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, { projects }));
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const update = req.body;

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "portfolio-projects" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      update.imageUrl = uploadResult.secure_url;
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res
      .status(200)
      .json(new ApiResponse(200, { project: updated }, "Project updated"));
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json(new ApiResponse(200, null, "Project deleted"));
  } catch (err) {
    next(err);
  }
};

export const filterProjectsByTech = async (req, res, next) => {
  try {
    const { tech } = req.query;

    if (!tech) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Tech stack filter is required"));
    }

    const filteredProjects = await Project.find({ techStack: { $in: [tech] } });

    return res
      .status(200)
      .json(
        new ApiResponse(200, filteredProjects, "Filtered projects fetched")
      );
  } catch (err) {
    next(err);
  }
};
