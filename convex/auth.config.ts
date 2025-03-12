export default {
  providers: [
    {
      // @ts-expect-error TODO: node types missing
      domain: process.env.CONVEX_SITE_URL,
      applicationID: 'convex',
    },
  ],
}
