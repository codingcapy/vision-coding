import {
  index,
  pgTable,
  varchar,
  timestamp,
  serial,
  integer,
  pgEnum,
  check,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { users } from "./users";

export const courseEnum = pgEnum("course", [
  "python1",
  "python2",
  "frontend1",
  "frontend2",
  "backend1",
  "backend2",
  "practicum",
  "datacomm",
  "comparch",
]);

export const statusEnum = pgEnum("status", [
  "pending",
  "active",
  "completed",
  "cancelled",
]);

export const enrolments = pgTable(
  "enrolments",
  {
    enrolmentId: serial("enrolment_id").primaryKey(),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.userId),
    course: courseEnum("course").notNull(),
    status: statusEnum("status").default("pending").notNull(),
    startedAt: timestamp("started_at"),
    endedAt: timestamp("ended_at"),
    progress: integer("progress").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("enrolments_user_id_idx").on(table.userId),
    check(
      "progress_range",
      sql`${table.progress} >= 0 AND ${table.progress} <= 100`,
    ),
  ],
);

export type Enrolment = InferSelectModel<typeof enrolments>;
