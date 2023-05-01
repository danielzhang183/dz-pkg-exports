import { promises as fs } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import { resolve } from 'path'
import { findExports, resolve as resolvePath } from 'mlly'
import { getPackageInfo } from 'local-pkg'
import type { GetExportsOptions } from './types'

export async function getExportsStatic(name: string, options?: GetExportsOptions) {
  const map = new Map<string, Promise<string[]>>()

  async function resolveEntry(name: string, importer?: string) {
    if (name.match(/^[@a-z0-9]/)) {
      try {
        const { rootPath, packageJson } = (await getPackageInfo(name, { paths: importer ? [fileURLToPath(importer)] : undefined }))!
        if (!packageJson.exports && packageJson.module)
          return pathToFileURL(resolve(rootPath, packageJson.module)).href
      }
      catch {}
    }

    return await resolvePath(name, {
      url: importer,
      extensions: ['.mjs', '.js'],
      conditions: ['module', 'import', 'require', 'default'],
    })
  }

  async function getExportsRelative(relative: string, importer?: string): Promise<string[]> {
    const url = await resolveEntry(relative, importer)
    return getExportsUrl(url)
  }

  async function getExportsUrl(url: string): Promise<string[]> {
    if (!map.has(url))
      map.set(url, _getExportsUrl(url))

    return await map.get(url)!
  }

  async function _getExportsUrl(url: string) {
    const code = await fs.readFile(fileURLToPath(url), 'utf-8')
    const exports = findExports(code)
    return (await Promise.all(
      exports.map(async (i) => {
        if (i.type === 'star' && i.specifier)
          return await getExportsRelative(i.specifier, url)
        return i.names
      })))
      .flat()
  }

  return [...new Set(await getExportsRelative(name, options?.url))]
}
