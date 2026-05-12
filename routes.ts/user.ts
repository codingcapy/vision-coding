import { Hono } from "hono";

const userRouter = new Hono().post("/login");
