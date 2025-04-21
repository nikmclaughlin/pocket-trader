import { v } from 'convex/values'
import { internal } from './_generated/api'
import {
  internalAction,
  internalMutation,
  internalQuery,
  MutationCtx,
} from './_generated/server'
import { Set, setValidator } from './schema'

export const getCurrentSetIds = internalQuery({
  handler: async (ctx) => {
    const currentSets = await ctx.db.query('sets').collect()

    return currentSets.map((set) => set.id)
  },
})

const clearExistingSets = async (ctx: MutationCtx) => {
  const existingSets = await ctx.db.query('sets').collect()

  await Promise.all(
    existingSets.map(async (set) => {
      await ctx.db.delete(set._id)
    })
  )
}

const insertSets = async (args: { ctx: MutationCtx; newSets: Set[] }) => {
  await Promise.all(
    args.newSets.map(async (set) => await args.ctx.db.insert('sets', set))
  )
}

export const replaceSetsTableData = internalMutation({
  args: v.object({
    newSets: v.array(setValidator),
  }),
  handler: async (ctx, args) => {
    await clearExistingSets(ctx)
    await insertSets({ ctx, newSets: args.newSets })
  },
})

export const updateSetsRoutine = internalAction({
  handler: async (ctx) => {
    // fetch set data from GH
    const remoteSets = await ctx.runAction(internal.github.fetchRemoteSets)
    // filter to only pocket sets
    const pocketSets = remoteSets.filter((set) => set.series === 'TCG Pocket')
    // clear existing set data and insert new pocket sets
    await ctx.runMutation(internal.sets.replaceSetsTableData, {
      newSets: pocketSets,
    })
  },
})
