import { getAuthUserId } from '@convex-dev/auth/server'
import { Infer, v } from 'convex/values'
import { Id } from './_generated/dataModel'
import {
  internalMutation,
  internalQuery,
  mutation,
  MutationCtx,
  query,
} from './_generated/server'
import { cardValidator } from './schema'

const cardListType = v.union(v.literal('wishlist'), v.literal('collection'))
export type CardListType = Infer<typeof cardListType>

const userCardList = v.array(cardValidator.fields.id)
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

export const getListsOfTypeForUsers = query({
  args: { listType: cardListType, users: v.array(v.id('users')) },
  handler: async (ctx, args) => {
    return (
      await ctx.db.query('userCardLists').withIndex('by_userId').collect()
    ).filter(
      (list) =>
        list.listType === args.listType && args.users.includes(list.userId)
    )
  },
})

export const updateListCards = mutation({
  args: {
    listType: cardListType,
    newCards: v.array(cardValidator.fields.id),
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

const replaceUserListCards = async ({
  userListId,
  newCards,
  ctx,
}: {
  userListId: Id<'userCardLists'>
  newCards: string[]
  ctx: MutationCtx
}) => {
  const oldListDoc = await ctx.db.get(userListId)

  if (oldListDoc) {
    await ctx.db.replace(userListId, {
      cards: newCards,
      listType: oldListDoc.listType,
      userId: oldListDoc.userId,
      _creationTime: oldListDoc._creationTime,
      _id: oldListDoc._id,
    })
  }
}

export const migrateListFromInternalIds = internalMutation({
  args: {
    userListId: v.id('userCardLists'),
  },
  handler: async (ctx, args) => {
    const userList = await ctx.db.get(args.userListId)
    if (userList) {
      // WARNING: does not validate that this list actually contains internal IDs
      const initialCards = userList?.cards as unknown as Id<'cards'>[]

      const newCards: Array<string> = []
      initialCards.map(async (internalCardId) => {
        const internalCard = await ctx.db.get(internalCardId)
        if (internalCard) newCards.push(internalCard.id)
      })

      replaceUserListCards({ userListId: args.userListId, newCards, ctx })
    }
  },
})
