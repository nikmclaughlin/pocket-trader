import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'

const crons = cronJobs()

crons.weekly(
  'update card set data',
  { dayOfWeek: 'tuesday', hourUTC: 10, minuteUTC: 0 },
  internal.sets.updateSetsRoutine
)

export default crons
