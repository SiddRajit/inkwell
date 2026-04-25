import { Router } from "express";
import { syncClerk } from "./clerk.controller.js";

const router = Router();

router.post("/clerk", syncClerk);

export default router;
