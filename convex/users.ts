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

export const getCurrentUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    const users = await ctx.db.query('users').withIndex('by_id').collect()
    return users.filter((user) => user._id === userId)[0]
  },
})

export const updateUser = mutation({
  args: {
    user: v.object({
      username: v.optional(v.string()),
      friendId: v.optional(
        v.object({
          id: v.string(),
          isPublic: v.boolean(),
        })
      ),
      isAnonymous: v.optional(v.boolean()),
    }),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthUserId(ctx)
    if (currentUser) {
      await ctx.db.patch(currentUser, args.user)
    }
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
