import mongoose from "mongoose";
import { type } from "os";
const messageSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    message : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

export const Message = mongoose.model("Message", messageSchema)