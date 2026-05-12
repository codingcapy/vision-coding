import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import { compress } from "hono/compress";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { serveStatic } from "hono/bun";
import { serve } from "@hono/node-server";
import { rateLimiter } from "hono-rate-limiter";

const getClientIp = (c: Context) =>
  c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
  c.req.header("x-real-ip") ??
  "unknown";

const app = new Hono();

app.use("*", logger());
app.use("*", compress());
app.use("*", secureHeaders());
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "https://visioncoding.up.railway.app"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(
  "/api/v0/users",
  rateLimiter({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    keyGenerator: getClientIp,
  }),
);

const PORT = parseInt(process.env.PORT!) || 3333;

const apiRoutes = app.basePath("/api/v0");

export type ApiRoutes = typeof apiRoutes;
export default app;

app.use("/*", serveStatic({ root: "./frontend/dist" }));
app.get("/*", async (c) => {
  try {
    const indexHtml = await Bun.file("./frontend/dist/index.html").text();
    return c.html(indexHtml);
  } catch (error) {
    console.error("Error reading index.html:", error);
    return c.text("Internal Server Error", 500);
  }
});

const server = serve({
  port: PORT,
  fetch: app.fetch,
});
console.log("Server running on port", PORT);
