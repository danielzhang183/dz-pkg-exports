import { describe, expect, it } from 'vitest'
import { getExports } from '../src'

describe('ESM', () => {
  it('@antfu/utils', async () => {
    expect((await getExports('@antfu/utils')).slice(0, 5))
      .toMatchInlineSnapshot(`
        [
          "assert",
          "at",
          "batchInvoke",
          "clamp",
          "clampArrayRange",
        ]
      `)
  })
})

describe('CJS', () => {
  it('axios', async () => {
    expect((await getExports('axios')).slice(0, 5))
      .toMatchInlineSnapshot(`
        [
          "request",
          "getUri",
          "delete",
          "get",
          "head",
        ]
      `)
  })

  it('@vue/reactivity', async () => {
    expect((await getExports('@vue/reactivity')).slice(0, 5))
      .toMatchInlineSnapshot(`
        [
          "assert",
          "at",
          "batchInvoke",
          "clamp",
          "clampArrayRange",
        ]
      `)
  })
})
