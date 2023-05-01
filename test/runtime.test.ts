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
    })))
      .toMatchInlineSnapshot(`
        [
          "EMPTY_ARR",
          "EMPTY_OBJ",
          "NO",
          "NOOP",
          "PatchFlagNames",
          "__esModule",
          "camelize",
          "capitalize",
          "def",
          "default",
          "escapeHtml",
          "escapeHtmlComment",
          "extend",
          "genPropsAccessExp",
          "generateCodeFrame",
          "getGlobalThis",
          "hasChanged",
          "hasOwn",
          "hyphenate",
          "includeBooleanAttr",
          "invokeArrayFns",
          "isArray",
          "isBooleanAttr",
          "isBuiltInDirective",
          "isDate",
          "isFunction",
          "isGloballyWhitelisted",
          "isHTMLTag",
          "isIntegerKey",
          "isKnownHtmlAttr",
          "isKnownSvgAttr",
          "isMap",
          "isModelListener",
          "isObject",
          "isOn",
          "isPlainObject",
          "isPromise",
          "isRegExp",
          "isReservedProp",
          "isSSRSafeAttrName",
          "isSVGTag",
          "isSet",
          "isSpecialBooleanAttr",
          "isString",
          "isSymbol",
          "isVoidTag",
          "looseEqual",
          "looseIndexOf",
          "looseToNumber",
          "makeMap",
          "normalizeClass",
          "normalizeProps",
          "normalizeStyle",
          "objectToString",
          "parseStringStyle",
          "propsToAttrMap",
          "remove",
          "slotFlagsText",
          "stringifyStyle",
          "toDisplayString",
          "toHandlerKey",
          "toNumber",
          "toRawType",
          "toTypeString",
        ]
      `)
  })
})
