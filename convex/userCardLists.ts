import { getAuthUserId } from '@convex-dev/auth/server'
import { Infer, v } from 'convex/values'
import { internalQuery, mutation } from './_generated/server'

const cardListType = v.union(v.literal('wishlist'), v.literal('collection'))
export type CardListType = Infer<typeof cardListType>

const userCardList = v.array(v.id('cards'))
export type UserCardList = Infer<typeof userCardList>

// Create a new empty wishlist for the current user
export const createUserCardlist = mutation({
  args: { listType: cardListType },
  handler: async (ctx, args) => {
    const currentUser = await getAuthUserId(ctx)

    if (currentUser) {
      const newWishlistId = await ctx.db.insert('userCardLists', {
        cards: [],
        listType: args.listType,
        userId: currentUser,
      })
      return newWishlistId
    }
  },
})

export const getForCurrentUser = internalQuery({
  args: { listType: cardListType },
  handler: async (ctx, args) => {
    const currentUser = await getAuthUserId(ctx)
    const userLists = await ctx.db
      .query('userCardLists')
      .withIndex('by_userId')
      .collect()
    const userList = userLists.filter(
      (list) => list.userId === currentUser && list.listType === args.listType
    )[0]
    return userList.cards
  },
  returns: userCardList,
})

export const updateListCards = mutation({
  args: {
    listType: cardListType,
    newCards: v.array(v.id('cards')),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthUserId(ctx)
    const userLists = await ctx.db
      .query('userCardLists')
      .withIndex('by_userId')
      .collect()
    const targetUserList = userLists.filter(
      (list) => list.userId === currentUser && list.listType === args.listType
    )[0]
    await ctx.db.patch(targetUserList._id, { cards: args.newCards })
  },
})
