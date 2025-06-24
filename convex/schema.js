
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

    users: defineTable({
        name: v.string(),
        email: v.string(),
        credits:v.number(),
        subscriptionId: v.optional(v.string())
    }),

    DiscussionRoom: defineTable({
        coachingOption: v.string(),
        topic: v.string(),
        expertName: v.string(),
        conversation: v.optional(v.any())
    }),


  // Define your schema here
  // For example, you can define a "users" table with a "name" field
  // users: {
  //   name: "string",
  //   email: "string",
  // },
});