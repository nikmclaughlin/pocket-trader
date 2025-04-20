'use node'
import { Octokit } from 'octokit'
import { internalAction } from './_generated/server'
import { Set } from './schema'

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
