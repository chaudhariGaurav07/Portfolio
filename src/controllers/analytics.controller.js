import { Analytics } from "../models/analytics.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { parseUserAgent } from "../utils/deviceParser.js";

export const logEvent = async (req, res, next) => {
  try {
    const { event, projectId } = req.body;
    const userAgent = req.headers["user-agent"] || "";
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const { browser, os, device } = parseUserAgent(userAgent);

    const log = await Analytics.create({
      event,
      projectId: projectId || null,
      ip,
      userAgent,
      browser,
      os,
      device,
    });

    res.status(201).json(new ApiResponse(201, { log }, "Logged"));
  } catch (err) {
    next(err);
  }
};

export const getLogs = async (req, res, next) => {
  try {
    const logs = await Analytics.find().sort({ createdAt: -1 });
    res.json({ logs });
  } catch (err) {
    next(err);
  }
};
