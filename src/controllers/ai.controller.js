import { ApiResponse } from "../utils/ApiResponse.js";
import { getOpenRouterResponse } from "../utils/openrouter.js";

export const askAI = async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res
      .status(400)
      .json(new ApiResponse(440, null, "Question is required"));
  }

  try {
    const answer = await getOpenRouterResponse(question);
    return res
      .status(200)
      .json(new ApiResponse(200, { answer }, "AI response fetched"));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, err.message || "Something went wrong"));
  }
};
