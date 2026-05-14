import { Router } from "express";
import { createPost, getPost, getPosts, deletePost } from "./post.controller.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);

export default router;
