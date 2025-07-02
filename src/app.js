import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";


export const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Rate Limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Routes

// Error Handler

