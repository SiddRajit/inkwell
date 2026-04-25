import { WebhookEvent } from "@clerk/express";
import { Request, Response } from "express";
import { Webhook } from "svix";
import { deleteUser, upsertUser } from "../users/user.controller.js";

export async function syncClerk(req: Request, res: Response) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).json({
      success: false,
      error: "Webhook secret not configured",
    });
  }

  const svixId = req.headers["svix-id"] as string;
  const svixTimestamp = req.headers["svix-timestamp"] as string;
  const svixSignature = req.headers["svix-signature"] as string;

  if (!svixId || !svixTimestamp || !svixSignature) {
    return res.status(400).json({ error: "Missing svix headers" });
  }

  const payload = req.body;
  const wh = new Webhook(secret);

  let event: WebhookEvent;

  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Webhook verification failed", error);
    return res.status(400).json({
      success: false,
      error: "Invalid webhook signature",
    });
  }

  try {
    switch (event.type) {
      case "user.created":
      case "user.updated":
        await upsertUser(event.data);
        break;

      case "user.deleted":
        if (event.data.id) {
          await deleteUser(event.data.id);
        }
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(`Error handling event ${event.type}:`, error);
    return res.status(500).json({ error: "Failed to process webhook" });
  }

  return res.status(200).json({ received: true });
}
