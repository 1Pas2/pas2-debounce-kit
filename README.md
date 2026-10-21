# pas2-debounce-kit

Debounce synchronous calls with cancel and flush controls.

Part of **Pas2 Kit** by [1Pas2](https://github.com/1Pas2): small independent TypeScript libraries with no runtime dependencies.

## Features

- Focused API with strict TypeScript declarations.
- ESM package for Node.js 22 and later.
- Automated behavioral tests and CI on Node.js 22 and 24.

## Installation

This package is prepared for npm but is **not published to npm**. Install from a local checkout:

```sh
git clone https://github.com/1Pas2/pas2-debounce-kit.git
cd pas2-debounce-kit
npm ci
npm run build
npm pack
```

Install the resulting `.tgz` in your application using `npm install /path/to/package.tgz`.
The intended npm name is `@1pas2/debounce-kit`; registry availability is not claimed.

## Usage

```ts
import { debounce } from '@1pas2/debounce-kit';
const log = debounce((value: string) => console.log(value), 100);
log('first'); log('last'); log.flush();
```

The checked-in example imports the local build. After building, run it with `node --experimental-strip-types examples/basic.ts` on a compatible Node.js release. Network and filesystem examples perform the operations shown.

## API and behavior

debounce(fn,waitMs) runs a trailing call using the latest arguments. cancel() discards it, flush() runs it immediately, pending() reports a timer. No leading mode or this binding. Intended for synchronous callbacks; callers own async error handling.

The complete public types are in [src/index.ts](src/index.ts) and generated in `dist/index.d.ts`.

## Development

```sh
npm ci
npm test
npm run check:examples
npm pack --dry-run
```

Tests use the built-in Node.js test runner against the compiled public API. Runtime dependencies: none. Development dependencies: TypeScript and Node.js type declarations. This initial release has a deliberately small scope; review its documented limits before production use.

## Ecosystem

Browse the [Pas2 Kit project index](https://github.com/1Pas2?tab=repositories&q=pas2-). Each repository builds and runs independently.

## Contributing

Open an issue describing a reproducible problem or submit a focused pull request with a behavioral test. Run the development commands above before submitting. Never include credentials or private information in reports.

## License

[MIT](LICENSE) © 2026 1Pas2.

1Pas2
