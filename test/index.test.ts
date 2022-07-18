import { resolve as resolvePackagePath } from 'mlly'
import { describe, expect, it } from 'vitest'
import { getExportsRuntime } from '../dist'

describe('ESM', () => {
  it('@antfu/utils', async () => {
    expect((await getExportsRuntime('@antfu/utils')).slice(0, 5))
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
    expect((await getExportsRuntime('axios')).slice(0, 5))
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

  it('@vue/shared', async () => {
    expect((await getExportsRuntime('@vue/shared', {
      url: await resolvePackagePath('vue'),
    })).slice(0, 5))
      .toMatchInlineSnapshot(`
        [
          "EMPTY_ARR",
          "EMPTY_OBJ",
          "NO",
          "NOOP",
          "PatchFlagNames",
        ]
      `)
  })
})
