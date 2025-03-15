import { authTables } from '@convex-dev/auth/server'
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  // Other tables here...

  ...authTables,

  cards: defineTable({
    artist: v.string(),
    cardNo: v.string(),
    category: v.string(),
    description: v.string(),
    flavor: v.string(),
    image: v.string(),
    name: v.string(),
    rarity: v.string(),
    set: v.string(),
  }),

  wishlists: defineTable({
    userId: v.id('users'),
    cards: v.array(v.id('cards')),
  }).index('by_userId', ['userId']),
})
