import { authTables } from '@convex-dev/auth/server'
import { defineSchema, defineTable } from 'convex/server'
import { Infer, v } from 'convex/values'

export const setValidator = v.object({
  id: v.string(),
  name: v.string(),
  series: v.string(),
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
})

export type Set = Infer<typeof setValidator>

export const energyTypeValidator = v.union(
  v.literal('Grass'),
  v.literal('Fire'),
  v.literal('Water'),
  v.literal('Lightning'),
  v.literal('Psychic'),
  v.literal('Fighting'),
  v.literal('Darkness'),
  v.literal('Metal'),
  v.literal('Dragon'),
  v.literal('Colorless')
)
export type energyTypes = Infer<typeof energyTypeValidator>

export const cardValidator = v.object({
  id: v.string(),
  name: v.string(),
  supertype: v.string(),
  subtypes: v.array(v.string()),
  rules: v.optional(v.array(v.string())),
  hp: v.optional(v.string()),
  types: v.optional(v.array(energyTypeValidator)),
  evolvesFrom: v.optional(v.string()),
  evolvesTo: v.optional(v.array(v.string())),
  abilities: v.optional(
    v.array(
      v.object({
        name: v.string(),
        text: v.string(),
        type: energyTypeValidator,
      })
    )
  ),
  attacks: v.optional(
    v.array(
      v.object({
        name: v.string(),
        cost: v.array(energyTypeValidator),
        convertedEnergyCost: v.number(),
        damage: v.string(),
        text: v.string(),
      })
    )
  ),
  weaknesses: v.optional(
    v.array(
      v.object({
        type: energyTypeValidator,
        value: v.string(),
      })
    )
  ),
  convertedRetreatCost: v.optional(v.number()),
  retreatCost: v.optional(v.array(energyTypeValidator)),
  number: v.string(),
  artist: v.string(),
  rarity: v.string(),
  flavorText: v.optional(v.string()),
  regulationMark: v.string(),
  images: v.object({
    small: v.string(),
    large: v.string(),
  }),
})

export type Card = Infer<typeof cardValidator>

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

  sets: defineTable(setValidator),

  cards: defineTable(cardValidator),

  userCardLists: defineTable({
    userId: v.id('users'),
    listType: v.union(v.literal('wishlist'), v.literal('collection')),
    cards: v.array(v.id('cards')),
  }).index('by_userId', ['userId']),
})
