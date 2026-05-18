import { scrypt, timingSafeEqual } from "crypto";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export function requireUser(c: Context) {
  const authHeader = c.req.header("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  try {
    return jwt.verify(authHeader.split(" ")[1]!, process.env.JWT_SECRET!) as {
      id: string;
      role: string;
    };
  } catch {
    throw new HTTPException(401, { message: "Invalid token" });
  }
}

export async function verifyPassword(hash: string, password: string) {
  const parts = hash.split(":");
  if (parts.length !== 2) throw new Error("Invalid hash format");
  const [salt, keyHex] = parts as [string, string];
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  const storedKey = Buffer.from(keyHex, "hex");
  if (derivedKey.length !== storedKey.length) return false;
  return timingSafeEqual(derivedKey, storedKey);
}
