  import express from "express";
  import cors from "cors";
  import helmet from "helmet";
  import morgan from "morgan";
  import rateLimit from "express-rate-limit";

  const app = express();

  // Middleware
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rate Limiter
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }));

  // Routes
  import userRouter from './routes/auth.routes.js'
  import projectRouter from "./routes/project.routes.js"
  import contactRouter from "./routes/contact.routes.js"
  import analyticsRouter from "./routes/analytics.routes.js"
  import aiRoutes from "./routes/ai.routes.js";
  import blogRoutes from "./routes/blog.routes.js"

  
  app.use("/api/v1/auth",userRouter)
  app.use("/api/v1/project", projectRouter)
  app.use("/api/v1/contact", contactRouter)
  app.use("/api/v1/analytics", analyticsRouter)
  app.use("/api/v1/ai", aiRoutes);
  app.use("/api/v1/blog", blogRoutes)


  export {app}

