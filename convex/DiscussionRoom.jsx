import React from 'react'
import { mutation,query} from './_generated/server'
import { v } from 'convex/values';

export const CreateDiscussionRoom = mutation({
  args: { 
    coachingOption: v.string(),
    topic: v.string(),
    expertName: v.string()
  },

  handler: async(ctx, args) => {
    // Create a new discussion room with the provided details
    const result = await ctx.db.insert('DiscussionRoom', {
      coachingOption: args.coachingOption,
      topic: args.topic,
      expertName: args.expertName
    //   conversation: [] // Initialize with an empty conversation
    });
    
    return result; // Return the created discussion room
  }

})

export const GetDiscussionRoom = query({
  args: {
     id: v.id('DiscussionRoom') 
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id);
    return result;
  }
})
