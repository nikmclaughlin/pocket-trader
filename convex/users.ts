import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const updateFriendId = mutation({
  args: { newId: v.string(), isPublic: v.boolean() },
  handler: async (ctx, args) => {
    const currentUser = await getAuthUserId(ctx)
    if (currentUser)
      await ctx.db.patch(currentUser, {
        friendId: { id: args.newId, isPublic: args.isPublic },
      })
  },
})
