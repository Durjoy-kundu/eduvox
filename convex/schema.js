import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

    users: defineTable({
        name: v.string(),
        email: v.string(),
        credits:v.number(),
        subscriptionId: v.string()
    })
  // Define your schema here
  // For example, you can define a "users" table with a "name" field
  // users: {
  //   name: "string",
  //   email: "string",
  // },
});