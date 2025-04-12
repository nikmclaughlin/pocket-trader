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

export const getListCardsForUser = query({
  args: { listType: v.union(v.literal('wishlist'), v.literal('collection')) },
  handler: async (ctx, args) => {
    // get the current user (Id<'users'>)
    const currentUser = await getAuthUserId(ctx)
    // get that users wishlist(s) (Doc<'wishlist'>[])
    const userCardLists = await ctx.db
      .query('userCardLists')
      .withIndex('by_userId')
      .collect()
    const targetUserList = userCardLists?.filter(
      (list) => list.userId === currentUser && list.listType === args.listType
    )[0]
    const allCards = await list(ctx, {})
    if (allCards && targetUserList) {
      return allCards.filter((card) => targetUserList.cards.includes(card._id))
    }
  },
})
