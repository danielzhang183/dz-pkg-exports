# dz-pkg-exports

[![NPM version](https://img.shields.io/npm/v/dz-pkg-exports?color=a1b858&label=)](https://www.npmjs.com/package/dz-pkg-exports)

## Install

```bash
npm i dz-pkg-exports
```

## Usage

### `getExportsRuntime`

Get the exports by evaluate the module in worker thread

```ts
import { getExportsRuntime } from 'dz-pkg-exports'

const exports = getExportsRuntime('vue')
console.log(exports) // ['ref, 'computed', ....]
```

### `getExportsStatic`

Get the exports by static analysis (only work with ESM)

```ts
import { getExportsStatic } from 'dz-pkg-exports'

const exports = getExportsStatic('vue')
console.log(exports) // ['ref, 'computed', ....]
```

## License

[MIT](./LICENSE) License © 2022 [Dylan Zhang](https://github.com/danielzhang183)
