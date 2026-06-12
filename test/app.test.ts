import { describe, expect, test } from 'bun:test'
import { app } from '../src/app.js'

describe('hono app', () => {
  test('returns health', async () => {
    const res = await app.request('/health')

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
  })

  test('returns profile', async () => {
    const res = await app.request('/profile')
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.handle).toBe('mattenarle10')
  })

  test('returns OpenAPI document', async () => {
    const res = await app.request('/doc')
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.openapi).toBe('3.0.0')
    expect(body.info.title).toBe('hono-serverless')
  })
})
