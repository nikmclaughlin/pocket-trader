import { v } from 'convex/values'
import { internal } from './_generated/api'
import {
  internalAction,
  internalMutation,
  MutationCtx,
} from './_generated/server'
import { fetchRemoteSets } from './github'
import { Set, setValidator } from './schema'

const clearExistingSets = async (ctx: MutationCtx) => {
  const existingSets = await ctx.db.query('sets').collect()

  existingSets.map(async (set) => {
    await ctx.db.delete(set._id)
  })
}

const insertSets = async (args: { ctx: MutationCtx; newSets: Set[] }) => {
  args.newSets.map((set) => args.ctx.db.insert('sets', set))
}

export const replaceSetsTableData = internalMutation({
  args: v.object({
    newSets: v.array(setValidator),
  }),
  handler: async (ctx, args) => {
    clearExistingSets(ctx).then(() => {
      insertSets({ ctx, newSets: args.newSets })
    })
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
