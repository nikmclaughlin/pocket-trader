import { getAuthUserId } from '@convex-dev/auth/server'
import { Infer, v } from 'convex/values'
import { internalQuery, mutation } from './_generated/server'

// Create a new empty wishlist for the current user
export const createWishlist = mutation({
  handler: async (ctx) => {
    const currentUser = await getAuthUserId(ctx)

    if (currentUser) {
      const newWishlistId = await ctx.db.insert('wishlists', {
        cards: [],
        userId: currentUser,
      })
      return newWishlistId
    }
  },
})

const userWishlistCards = v.array(v.id('cards'))

export const getForCurrentUser = internalQuery({
  handler: async (ctx) => {
    const currentUser = await getAuthUserId(ctx)
    const wishlists = await ctx.db
      .query('wishlists')
      .withIndex('by_userId')
      .collect()
    const userWishlist = wishlists.filter(
      (wishlist) => wishlist.userId === currentUser
    )[0]
    return userWishlist.cards
  },
  returns: userWishlistCards,
})

export type UserWishlistCards = Infer<typeof userWishlistCards>
