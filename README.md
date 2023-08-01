# `mr-world` The global variable integration for Astro

<p align="center">
  <a href="https://github.com/jlarmstrongiv/mr-world#readme" target="_blank">
    <img alt="mr-world" src="https://raw.githubusercontent.com/jlarmstrongiv/mr-world/HEAD/logos/mr-world.png" width="400" height="225" style="max-width: 100%; object-fit: cover;">
  </a>
</p>

<p align="center">
  It’s never a matter of old and new. It’s only about patterns.
  <br />
  —Mr. World, American Gods
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/mr-world"><img src="https://img.shields.io/npm/dt/mr-world.svg" alt="Total Downloads"></a>
  <!-- https://github.com/mr-world/mr-world/releases -->
  <a href="https://www.npmjs.com/package/mr-world?activeTab=versions"><img src="https://img.shields.io/npm/v/mr-world.svg" alt="Latest Release"></a>
  <a href="https://github.com/jlarmstrongiv/mr-world/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/mr-world.svg" alt="License"></a>
</p>

---

## Motivation

Provide an integration for Astro to define global variables that work in:

- [Astro middleware](https://docs.astro.build/en/guides/middleware/)
- [Astro endpoints](/Users/jlarmst/Desktop/code/astro/astro-global-testing/README.md)
- [Astro components](https://docs.astro.build/en/core-concepts/astro-syntax/)
- [Astro `.astro` pages](https://docs.astro.build/en/core-concepts/astro-pages/)
- [Astro props](https://docs.astro.build/en/core-concepts/astro-components/#component-props)
- [Astro `.mdx` files](https://docs.astro.build/en/guides/markdown-content/)
- [UI Framework props](https://docs.astro.build/en/core-concepts/framework-components/)
- [Script tags](https://docs.astro.build/en/guides/client-side-scripts/)

## Quick start

### Install

Install via [npm](https://www.npmjs.com/package/mr-world):

```shell
npm install mr-world
```

### Configure

In your Astro [config](https://docs.astro.build/en/guides/configuring-astro/#supported-config-file-types) file:

```ts
import { defineConfig } from "astro/config";
import { mrWorld } from "mr-world/integration";

export default defineConfig({
  site: "https://example.com",
  integrations: [
    mrWorld({
      id: "DEFAULT_LOCALE"
      useEffect: () => {

        // set global properties and functions
        globalThis.DEFAULT_LOCALE = "en";

        return () => {
          // cleanup side effects
        };
      },
    }),
  ],
});
```

In your Astro [`env.d.ts`](https://docs.astro.build/en/guides/typescript/#extending-window-and-globalthis) file:

```ts
declare module globalThis {
  var DEFAULT_LOCALE: "en";
}
```

#### Configure script tags

In the head of your document:

```astro
---
import { Serialize } from "mr-world/serialize";
---

<Serialize id="locale" data={{ DEFAULT_LOCALE: "en" }} />
```

After your `<Serialize />` component:

```html
<script>
  import { deserialize } from "mr-world/deserialize";

  const data = await deserialize({
    id: "locale",
  });
</script>
```

You can pass a custom serializer as props or a custom deserializer in parameters. Custom serializers may support nested structures or other data types like `Date` or `ArrayBuffer`:

- [typeson](https://www.npmjs.com/package/typeson)
- [devalue](https://www.npmjs.com/package/devalue)

By default, `JSON.stringify` and `JSON.parse` are used as serializes.

## License

MIT Licensed

## Contributing

PRs welcome! Thank you for your help.
