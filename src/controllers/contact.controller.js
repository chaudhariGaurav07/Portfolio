import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendContactEmail } from "../utils/sendEmail.js";

export const sendMessage = async (req, res, next) => {
    try {

        const {name, email, message} = req.body;

        if (!name || !email || !message) {
            throw new ApiError(400, "All fields are required")
        }
        const savedMessage = await Message.create({ name, email, message });
        await sendContactEmail({ name, email, message });

        res.status(200).json(new ApiResponse(200, {savedMessage}, "message sent successfully"))
    } catch (err) {
        next(err)
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find().sort({createdAt: -1})
        res.status(200).json(messages)
    } catch (err) {
        next(err)
    }
}