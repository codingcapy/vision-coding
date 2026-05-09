import z from "zod";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

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
