import { Router } from "express";
import { createPost, getPosts } from "./post.controller.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);

export default router;
