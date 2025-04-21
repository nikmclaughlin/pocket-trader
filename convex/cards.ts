import { getAuthUserId } from '@convex-dev/auth/server'
import { filter } from 'convex-helpers/server/filter'
import { v } from 'convex/values'
import { internal } from './_generated/api'
import {
  internalAction,
  internalMutation,
  MutationCtx,
  query,
} from './_generated/server'
import { Card, cardValidator } from './schema'

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
  args: {
    listType: v.union(v.literal('wishlist'), v.literal('collection')),
    user: v.optional(v.id('users')),
  },
  handler: async (ctx, args) => {
    const targetUser = args.user ?? (await getAuthUserId(ctx))
    // get that users wishlist(s) (Doc<'wishlist'>[])
    const userCardLists = await ctx.db
      .query('userCardLists')
      .withIndex('by_userId')
      .collect()
    const targetUserList = userCardLists?.filter(
      (list) => list.userId === targetUser && list.listType === args.listType
    )[0]
    const allCards = await list(ctx, {})
    if (allCards && targetUserList) {
      return allCards.filter((card) => targetUserList.cards.includes(card._id))
    }
  },
})

const clearExistingCardsFromSet = async (ctx: MutationCtx, setId: string) => {
  const existingCardsFromSet = await filter(
    ctx.db.query('cards'),
    (card) => card.id.split('-')[0] === setId
  ).collect()

  console.log(
    'Found ' +
      (existingCardsFromSet.length + 1) +
      ' cards for set ' +
      setId +
      ' already in the databse. Deleting...'
  )

  await Promise.all(
    existingCardsFromSet.map(async (card) => {
      await ctx.db.delete(card._id)
    })
  )
}

const insertCards = async (args: { ctx: MutationCtx; cards: Card[] }) => {
  await Promise.all(
    args.cards.map(async (card) => await args.ctx.db.insert('cards', card))
  )
}

export const replaceCardDataForSet = internalMutation({
  args: { setId: v.string(), newCards: v.array(cardValidator) },
  handler: async (ctx, args) => {
    await clearExistingCardsFromSet(ctx, args.setId)
    console.log(
      'Inserting ' + args.newCards.length + 'new cards from set ' + args.setId
    )
    await insertCards({ ctx, cards: args.newCards })
  },
})

export const updateCardsForSet = internalAction({
  args: { setId: v.string() },
  handler: async (ctx, args) => {
    // fetch cards for set from data repo
    const remoteCards = await ctx.runAction(
      internal.github.fetchRemoteCardsForSet,
      {
        setId: args.setId,
      }
    )
    console.log(
      'Fetched ' + (remoteCards.length + 1) + ' cards matching ' + args.setId
    )
    await ctx.runMutation(internal.cards.replaceCardDataForSet, {
      setId: args.setId,
      newCards: remoteCards,
    })
  },
})

export const updateCardsForAllSets = internalAction({
  handler: async (ctx) => {
    const currentSetIds = await ctx.runQuery(internal.sets.getCurrentSetIds)
    console.log('Found ' + currentSetIds.length + ' sets. Updating...')
    await Promise.all(
      currentSetIds.map(
        async (setId) =>
          await ctx.runAction(internal.cards.updateCardsForSet, { setId })
      )
    )
  },
})
