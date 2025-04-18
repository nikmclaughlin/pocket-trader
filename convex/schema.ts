import { authTables } from '@convex-dev/auth/server'
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  // Other tables here...

  ...authTables,

  users: defineTable({
    username: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    friendId: v.optional(v.object({ id: v.string(), isPublic: v.boolean() })),
  }).index('email', ['email']),

  sets: defineTable({
    id: v.string(),
    name: v.string(),
    printedTotal: v.number(),
    total: v.number(),
    legalities: v.union(
      v.object({}),
      v.object({
        unlimited: v.string(),
        standard: v.string(),
        expanded: v.string(),
      })
    ),
    ptcgoCode: v.string(),
    releaseDate: v.string(),
    updatedAt: v.string(),
    images: v.object({
      symbol: v.string(),
      logo: v.string(),
    }),
  }),

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

  userCardLists: defineTable({
    userId: v.id('users'),
    listType: v.union(v.literal('wishlist'), v.literal('collection')),
    cards: v.array(v.id('cards')),
  }).index('by_userId', ['userId']),
})
