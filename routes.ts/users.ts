import z from "zod";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { mightFail } from "might-fail";
import { db } from "../db";
import { users as usersTable } from "../schemas/users";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { randomUUIDv7 } from "bun";
import { requireUser, verifyPassword } from "./utils";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

const createUserSchema = z.object({
  username: z.string().min(1).max(32),
  email: z.email({ pattern: z.regexes.html5Email }).max(256),
  password: z.string().min(8).max(128),
});

const updatePasswordSchema = z.object({
  currentPassword: z.string().max(128),
  password: z.string().min(8).max(128),
});

export const usersRouter = new Hono()
  .post("/", zValidator("json", createUserSchema), async (c) => {
    const insertValues = c.req.valid("json");
    const { error: emailQueryError, result: emailQueryResult } =
      await mightFail(
        db
          .select({ userId: usersTable.userId })
          .from(usersTable)
          .where(eq(usersTable.email, insertValues.email)),
      );
    if (emailQueryError) {
      throw new HTTPException(500, {
        message: "Error while fetching user",
        cause: emailQueryError,
      });
    }
    if (emailQueryResult.length > 0) {
      return c.json(
        { message: "An account with this email already exists" },
        409,
      );
    }
    const { error: usernameQueryError, result: usernameQueryResult } =
      await mightFail(
        db
          .select({ userId: usersTable.userId })
          .from(usersTable)
          .where(eq(usersTable.username, insertValues.username)),
      );
    if (usernameQueryError) {
      throw new HTTPException(500, {
        message: "Error while fetching user",
        cause: usernameQueryError,
      });
    }
    if (usernameQueryResult.length > 0) {
      return c.json(
        { message: "An account with this username already exists" },
        409,
      );
    }
    const encrypted = await hashPassword(insertValues.password);
    const userId = randomUUIDv7();
    const { error: userInsertError, result: userInsertResult } =
      await mightFail(
        db
          .insert(usersTable)
          .values({
            userId: userId,
            username: insertValues.username,
            email: insertValues.email,
            password: encrypted,
          })
          .returning({
            userId: usersTable.userId,
            username: usersTable.username,
            email: usersTable.email,
            profilePic: usersTable.profilePic,
            role: usersTable.role,
            status: usersTable.status,
            preference: usersTable.preference,
            createdAt: usersTable.createdAt,
          }),
      );
    if (userInsertError) {
      console.log("Error while creating user");
      throw new HTTPException(500, {
        message: "Error while creating user",
        cause: userInsertResult,
      });
    }
    const createdUser = userInsertResult[0];
    if (!createdUser) {
      throw new HTTPException(500, {
        message: "Error while creating user",
      });
    }
    return c.json({ user: createdUser }, 200);
  })
  .post(
    "/update/password",
    zValidator("json", updatePasswordSchema),
    async (c) => {
      const decodedUser = requireUser(c);
      const updateValues = c.req.valid("json");
      const { error: userQueryError, result: userQueryResult } =
        await mightFail(
          db
            .select()
            .from(usersTable)
            .where(eq(usersTable.userId, decodedUser.id)),
        );
      if (userQueryError || !userQueryResult[0]) {
        throw new HTTPException(500, { message: "Error fetching user" });
      }
      const isCurrentPasswordValid = await verifyPassword(
        userQueryResult[0].password,
        updateValues.currentPassword,
      );
      if (!isCurrentPasswordValid) {
        throw new HTTPException(401, {
          message: "Current password is incorrect",
        });
      }
      const encrypted = await hashPassword(updateValues.password);
      const { error: updateError, result: updateResult } = await mightFail(
        db
          .update(usersTable)
          .set({ password: encrypted })
          .where(eq(usersTable.userId, decodedUser.id))
          .returning(),
      );
      if (updateError) {
        throw new HTTPException(500, {
          message: "Error while updating password",
          cause: updateError,
        });
      }
      return c.json({ user: updateResult[0] }, 200);
    },
  );
