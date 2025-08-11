import { Blog } from "../models/blog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Create Blog
export const createBlog = async (req, res, next) => {
  try {
    let { title, content, tags, category, externalLink, published, publishedAt } = req.body;

    // Convert comma-separated string to array if needed
    if (typeof tags === "string") {
      tags = tags.split(",").map(tag => tag.trim()).filter(Boolean);
    }

    let imageUrl = null;

    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "blogs" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      imageUrl = result.secure_url;
    }

    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / 200);
    const authorName = req.user?.name || "Gaurav Chaudhari";
    const excerpt = content.split(/\s+/).slice(0, 40).join(" ") + "...";

    const blog = await Blog.create({
      title,
      content,
      tags,
      published,
      category,
      // Use manual date if provided, else now
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      image: imageUrl,
      readTime,
      author: authorName,
      excerpt,
      externalLink,
    });

    res.status(201).json(new ApiResponse(201, blog, "Blog created"));
  } catch (err) {
    next(err);
  }
};


// Get All Blogs
export const getAllBlog = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, blogs, "All blogs"));
  } catch (err) {
    next(err);
  }
};

// Get Single Blog
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

// Update Blog
export const updateBlog = async (req, res, next) => {
  try {
    let { title, content, tags, category, externalLink, published, publishedAt } = req.body;

    // Convert comma-separated string to array if needed
    if (typeof tags === "string") {
      tags = tags.split(",").map(tag => tag.trim()).filter(Boolean);
    }

    let imageUrl = null;
    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "blogs" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      imageUrl = result.secure_url;
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json(new ApiResponse(404, null, "Blog not found"));
    }

    // Update fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.category = category || blog.category;
    blog.externalLink = externalLink || blog.externalLink;
    blog.published = published !== undefined ? published : blog.published;
    if (publishedAt) blog.publishedAt = new Date(publishedAt);

    if (content) {
      const words = content.split(/\s+/).length;
      blog.readTime = Math.ceil(words / 200);
      blog.excerpt = content.split(/\s+/).slice(0, 40).join(" ") + "...";
    }
    if (imageUrl) blog.image = imageUrl;

    await blog.save();

    res.status(200).json(new ApiResponse(200, blog, "Blog updated"));
  } catch (err) {
    next(err);
  }
};


// Delete Blog
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
