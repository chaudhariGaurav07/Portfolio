import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  tags: [String],
  category: {
    type: String,
  },
  publishedAt: { type: Date, default: Date.now },
  readTime: Number, // You can calculate it from content length
  author: String,
  excerpt: {
    type: String,
    required: true,
  },
});

export const Blog = mongoose.model("Blog", blogSchema);
