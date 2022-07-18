import { resolve as resolvePackage } from 'mlly'
import type { GetExportsOptions } from './types'

export async function getExports(name: string, options?: GetExportsOptions) {
  const path = await resolvePackage(name, { url: options?.url })
  const pkg = await import(path)
  const keys = Object.keys(pkg)
  if (keys.length === 1 && keys[0] === 'default')
    return Object.keys(pkg.default)
  return Object.keys(await import(name))
}
