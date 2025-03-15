import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { query } from './_generated/server'

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query('cards').collect()
  },
})

export const get = query({
  args: { cardId: v.id('cards') },
  handler: async (ctx, args) => {
    const cardData = await ctx.db.get(args.cardId)

    return cardData
  },
})

export const getWishlistCardsForUser = query({
  handler: async (ctx) => {
    // get the current user (Id<'users'>)
    const currentUser = await getAuthUserId(ctx)
    // get that users wishlist(s) (Doc<'wishlist'>[])
    const wishlists = await ctx.db
      .query('wishlists')
      .withIndex('by_userId')
      .collect()
    const userWishlist = wishlists?.filter(
      (wishlist) => wishlist.userId === currentUser
    )[0]
    const allCards = await list(ctx, {})
    if (allCards && userWishlist) {
      return allCards.filter((card) => userWishlist.cards.includes(card._id))
    }
  },
})
