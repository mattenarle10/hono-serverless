import { hc } from 'hono/client'
import { app, type AppType } from './app.js'

const apiUrl = process.env.API_URL
const localFetch: typeof app.request = (input, init) => app.request(input, init)
const client = hc<AppType>(apiUrl ?? 'http://local.test', {
  fetch: apiUrl ? globalThis.fetch : localFetch,
})

const health = await client.health.$get()
const profile = await client.profile.$get()

console.log({
  health: await health.json(),
  profile: await profile.json(),
})
