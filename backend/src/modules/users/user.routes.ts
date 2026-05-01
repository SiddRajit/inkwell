import { getAuth } from "@clerk/express";
import { Request, Response, Router } from "express";
import { createClerkClient } from "@clerk/express";
import { upsertUser } from "./user.controller.js";

const router = Router();
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

router.post("/sync", async (req: Request, res: Response) => {
  try {
    const authDebug = getAuth(req);
    const { userId } = getAuth(req);
    const auth = getAuth(req);

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const clerkUser = await clerkClient.users.getUser(userId);

    const primaryEmail = clerkUser.emailAddresses.find(
      (e) => e.id === clerkUser.primaryEmailAddressId,
    );

    await upsertUser({
      id: clerkUser.id,
      username:
        clerkUser.username ??
        primaryEmail?.emailAddress.split("@")[0] ??
        clerkUser.id,
      email: primaryEmail?.emailAddress ?? "",
      bio: null,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error syncing user", error);
    res.status(500).json({ success: false });
  }
});

export default router;
