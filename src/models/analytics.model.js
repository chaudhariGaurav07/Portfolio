import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true,
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        default: null
    },
    ip: String,
    device: String,
    browser: String,
    os: String,
    userAgent: String,
    createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Analytics = mongoose.model("Analytics", analyticsSchema);
