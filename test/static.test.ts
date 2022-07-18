import { describe, expect, it } from 'vitest'
import { getExportsStatic } from '../src'

describe('ESM', () => {
  it('@antfu/utils', async () => {
    expect((await getExportsStatic('@antfu/utils')))
      .toMatchInlineSnapshot('"file:///Users/dylanzhang/i/dz-pkg-exports/node_modules/.pnpm/@antfu+utils@0.5.2/node_modules/@antfu/utils/dist/index.mjs"')
  })
})
