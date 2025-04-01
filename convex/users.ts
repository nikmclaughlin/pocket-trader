import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (userId === null) {
      return null
    }
    return await ctx.db.get(userId)
  },
})

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
