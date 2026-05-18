import { zValidator } from "@hono/zod-validator";
import { Hono, type Context } from "hono";
import { HTTPException } from "hono/http-exception";
import z from "zod";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { mightFail } from "might-fail";
import {
  courseEnum,
  enrolments as enrolmentsTable,
} from "../schemas/enrolments";
import { and, desc, eq, getTableColumns, lt, ne } from "drizzle-orm";
import { requireUser } from "./utils";

const createEnrolmentSchema = z.object({
  course: z.enum(courseEnum.enumValues),
});

const getEnrolmentsSchema = z.object({
  cursor: z.coerce.number().optional(),
  limit: z.coerce.number().min(1).max(50).default(10),
});

export const enrolmentsRouter = new Hono()
  .post("/", zValidator("json", createEnrolmentSchema), async (c) => {
    const decodedUser = requireUser(c);
    const insertValues = c.req.valid("json");
    const { error: enrolmentQueryError, result: enrolmentQueryResult } =
      await mightFail(
        db
          .select()
          .from(enrolmentsTable)
          .where(
            and(
              eq(enrolmentsTable.course, insertValues.course),
              eq(enrolmentsTable.userId, decodedUser.id),
              ne(enrolmentsTable.status, "cancelled"),
            ),
          ),
      );
    if (enrolmentQueryError)
      throw new HTTPException(500, {
        message: "error while querying enrolment",
        cause: enrolmentQueryError,
      });
    if (enrolmentQueryResult.length > 0)
      throw new HTTPException(409, { message: "Already enrolled" });
    const { error: enrolmentInsertError, result: enrolmentInsertResult } =
      await mightFail(
        db
          .insert(enrolmentsTable)
          .values({ ...insertValues, userId: decodedUser.id })
          .returning(),
      );
    if (enrolmentInsertError || !enrolmentInsertResult[0]) {
      console.log("Error while creating enrolment");
      console.log(enrolmentInsertError);
      throw new HTTPException(500, {
        message: "Error while creating enrolment",
        cause: enrolmentInsertError,
      });
    }
    return c.json({ enrolment: enrolmentInsertResult[0] }, 200);
  })
  .get("/", zValidator("query", getEnrolmentsSchema), async (c) => {
    const decodedUser = requireUser(c);
    const { cursor, limit } = c.req.valid("query");
    const cursorClause = cursor
      ? lt(enrolmentsTable.enrolmentId, cursor)
      : undefined;
    const { result: enrolmentsQueryResult, error: enrolmentsQueryError } =
      await mightFail(
        db
          .select(getTableColumns(enrolmentsTable))
          .from(enrolmentsTable)
          .where(and(eq(enrolmentsTable.userId, decodedUser.id), cursorClause))
          .orderBy(desc(enrolmentsTable.enrolmentId))
          .limit(limit + 1),
      );
    if (enrolmentsQueryError)
      throw new HTTPException(500, {
        message: "error querying enrolments",
        cause: enrolmentsQueryError,
      });
    const hasMore = enrolmentsQueryResult.length > limit;
    const enrolments = hasMore
      ? enrolmentsQueryResult.slice(0, limit)
      : enrolmentsQueryResult;
    const lastEnrolment = enrolments[enrolments.length - 1];
    const nextCursor =
      hasMore && lastEnrolment ? lastEnrolment.enrolmentId : null;
    return c.json({ enrolments, nextCursor });
  })
  .get("/all", zValidator("query", getEnrolmentsSchema), async (c) => {
    const decodedUser = requireUser(c);
    if (decodedUser.role !== "admin")
      throw new HTTPException(403, { message: "Forbidden" });
    const { cursor, limit } = c.req.valid("query");
    const cursorClause = cursor
      ? lt(enrolmentsTable.enrolmentId, cursor)
      : undefined;
    const { result: enrolmentsQueryResult, error: enrolmentsQueryError } =
      await mightFail(
        db
          .select(getTableColumns(enrolmentsTable))
          .from(enrolmentsTable)
          .where(cursorClause)
          .orderBy(desc(enrolmentsTable.enrolmentId))
          .limit(limit + 1),
      );
    if (enrolmentsQueryError)
      throw new HTTPException(500, {
        message: "error querying enrolments",
        cause: enrolmentsQueryError,
      });
    const hasMore = enrolmentsQueryResult.length > limit;
    const enrolments = hasMore
      ? enrolmentsQueryResult.slice(0, limit)
      : enrolmentsQueryResult;
    const lastEnrolment = enrolments[enrolments.length - 1];
    const nextCursor =
      hasMore && lastEnrolment ? lastEnrolment.enrolmentId : null;
    return c.json({ enrolments, nextCursor });
  })
  .get("/:course", async (c) => {
    const decodedUser = requireUser(c);
    const courseParam = c.req.param().course;
    const parsedCourse = z.enum(courseEnum.enumValues).safeParse(courseParam);
    if (!parsedCourse.success)
      throw new HTTPException(400, { message: "Invalid course" });
    const course = parsedCourse.data;
    const { error: enrolmentQueryError, result: enrolmentQueryResult } =
      await mightFail(
        db
          .select()
          .from(enrolmentsTable)
          .where(
            and(
              eq(enrolmentsTable.course, course),
              eq(enrolmentsTable.userId, decodedUser.id),
              ne(enrolmentsTable.status, "cancelled"),
            ),
          ),
      );
    if (enrolmentQueryError)
      throw new HTTPException(500, { message: "error querying enrolment" });
    return c.json({ enrolment: enrolmentQueryResult[0] });
  });
