import { clerkMiddleware } from "@clerk/express";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(clerkMiddleware());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
