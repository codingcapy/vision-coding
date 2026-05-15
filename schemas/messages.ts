import { varchar, pgTable, timestamp, serial } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  messageId: serial("message_id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  content: varchar("content", { length: 20000 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
