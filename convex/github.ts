'use node'
import { v } from 'convex/values'
import { Octokit } from 'octokit'
import { internalAction } from './_generated/server'
import { Card, Set } from './schema'

export const fetchRemoteSets = internalAction({
  handler: async () => {
    const octokit = new Octokit({
      auth: process.env.GH_FETCH_TOKEN,
    })

    const res = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner: 'nikmclaughlin',
        repo: 'pocket-trader-data',
        path: 'sets/en.json',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          accept: 'application/vnd.github.object+json',
        },
      }
    )
    const sets = JSON.parse(
      // octokit types are not ESNext compatible, which is a Convex requirement ☹️
      // @ts-expect-error "Property 'content' does not exist on type <OctokitResponse>"
      Buffer.from(res.data.content, 'base64').toString()
    ) as Set[]

    return sets
  },
})

export const fetchRemoteCardsForSet = internalAction({
  args: { setId: v.string() },
  handler: async (_, args) => {
    const octokit = new Octokit({
      auth: process.env.GH_FETCH_TOKEN,
    })

    const res = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner: 'nikmclaughlin',
        repo: 'pocket-trader-data',
        path: `cards/en/${args.setId}.json`,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          accept: 'application/vnd.github.object+json',
        },
      }
    )
    const cards = JSON.parse(
      // @ts-expect-error "Property 'content' does not exist on type <OctokitResponse>"
      Buffer.from(res.data.content, 'base64').toString()
    ) as Card[]

    return cards
  },
})
