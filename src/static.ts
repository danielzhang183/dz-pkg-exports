import { resolve as resolvePackagePath } from 'mlly'
import type { GetExportsOptions } from './types'

export async function getExportsStatic(name: string, options?: GetExportsOptions) {
  const path = await resolvePackagePath(name, { url: options?.url })

  console.log(path)
  return path
}
