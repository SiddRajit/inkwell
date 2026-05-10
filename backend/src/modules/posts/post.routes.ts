import { Router } from "express";
import { createPost, getPost, getPosts } from "./post.controller.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);

export default router;
