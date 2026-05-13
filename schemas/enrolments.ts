import {
  index,
  pgTable,
  varchar,
  timestamp,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { users } from "./users";

export const enrolments = pgTable(
  "users",
  {
    enrolmentId: serial("enrolment_id").primaryKey(),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.userId),
    course: varchar("course").notNull(),
    status: varchar("status").default("pending").notNull(),
    startedAt: timestamp("created_at"),
    endedAt: timestamp("created_at"),
    progress: integer("progress").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("enrolments_user_id_idx").on(table.userId)],
);

export type Enrolment = InferSelectModel<typeof enrolments>;
