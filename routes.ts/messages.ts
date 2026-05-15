import { zValidator } from "@hono/zod-validator";
import { createInsertSchema } from "drizzle-zod";
import { Hono } from "hono";
import { messages as messagesTable } from "../schemas/messages";
import { mightFail } from "might-fail";
import { db } from "../db";
import { HTTPException } from "hono/http-exception";

export const messagesRouter = new Hono().post(
  "/",
  zValidator(
    "json",
    createInsertSchema(messagesTable).omit({
      messageId: true,
      createdAt: true,
    }),
  ),
  async (c) => {
    const insertValues = c.req.valid("json");
    const { error: messageInsertError, result: messageInsertResult } =
      await mightFail(
        db.insert(messagesTable).values(insertValues).returning(),
      );
    if (messageInsertError)
      throw new HTTPException(500, {
        message: "Error while creating message",
        cause: messageInsertError,
      });
    return c.json({ message: messageInsertResult });
  },
);
