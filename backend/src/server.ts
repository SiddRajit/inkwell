import { clerkMiddleware } from "@clerk/express";
import express from "express";
import cors from "cors";
import postsRouter from "./modules/posts/post.routes.js";

const app = express();
const PORT = process.env.PORT || 3002;

// Webhooks

app.use("/api/webhooks", express.raw({ type: "application/json" }));

// Middleware

app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173/",
    credentials: true,
  }),
);

// Health

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString,
    message: "Welcome to InkWell blog app API",
    enpoints: {
      posts: "/api/users",
    },
  });
});

// Routes

app.use("/api/posts", postsRouter);

// 404 handler

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error Handler

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      success: false,
      error: err,
      message: "Internal server error",
    });
  },
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
