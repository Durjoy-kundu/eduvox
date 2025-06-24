import React from 'react'
import { mutation } from './_generated/server'
import { v } from 'convex/values';

export const CreateDiscussionRoom = mutation({
  args: { 
    CoachingOptions: v.string(),
    topic: v.string(),
    expertName: v.string()
  },

  handler: async (ctx, args) => {
    // Create a new discussion room with the provided details
    const result = await ctx.db.insert('DiscussionRoom', {
      coachingOption: args.CoachingOptions,
      topic: args.topic,
      expertName: args.expertName,
    //   conversation: [] // Initialize with an empty conversation
    });
    
    return result; // Return the created discussion room
  }

})
