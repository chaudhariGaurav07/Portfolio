import { Blog } from "../models/blog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createBlog = async (req, res, next) => {
  try {
    const { title, content, tags, category, published } = req.body;
    const image = req.file?.path || null;

    const blog = await Blog.create({
      title,
      content,
      tags,
      category,
      published,
      image,
    });

    res.status(201).json(new ApiResponse(201, blog, "Blog created"));
  } catch (err) {
    next(err);
  }
};

export const getAllBlog = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, blogs, "All blogs"));
  } catch (err) {
    next(err);
  }
};

export const getSingleBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json(new ApiResponse(404, null, "Blog not found"));
    }
    res.status(200).json(new ApiResponse(200, blog, "Blog fetched"));
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { title, content, tags, category, published } = req.body;
    const image = req.file?.path;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json(new ApiResponse(404, null, "Blog not found"));
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.category = category || blog.category;
    blog.published = published !== undefined ? published : blog.published;
    if (image) blog.image = image;

    await blog.save();

    res.status(200).json(new ApiResponse(200, blog, "Blog updated"));
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json(new ApiResponse(404, null, "Blog not found"));
    }
    res.status(200).json(new ApiResponse(200, null, "Blog deleted"));
  } catch (err) {
    next(err);
  }
};
