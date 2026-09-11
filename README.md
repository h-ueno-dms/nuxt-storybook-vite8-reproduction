# Nuxt 4.5 / Vite 8 / Storybook reproduction

Minimal reproduction for
[nuxt-modules/storybook#1088](https://github.com/nuxt-modules/storybook/issues/1088).

With Nuxt 4.5.1 and the current Nuxt Storybook 9.0.1 packages, the Storybook
server starts but its preview fails with:

```text
Pre-transform error: Missing field moduleType
Plugin: builtin:replace
File: [object Object]
```

## Environment

- Node 24.x
- npm
- Nuxt 4.5.1
- Storybook 9.1.20
- `@nuxtjs/storybook` 9.0.1
- `@storybook-vue/nuxt` 9.0.1
- Vite 7.3.6 for the Storybook dependency tree
- Vite 8.2.0 under Nuxt 4.5.1

The two Vite versions are intentionally preserved in `package-lock.json` to
match the failing dependency graph. The Nuxt-scoped override prevents a newer
Vite 8.x release from being selected when the lockfile is regenerated.

## Reproduction

```bash
npm ci --legacy-peer-deps
npm run storybook
```

Open <http://localhost:6006/>. The Storybook manager loads, but the preview
request fails and the terminal reports the `builtin:replace` error above.

The `--legacy-peer-deps` option is required because this reproduction keeps the
reported Storybook 9.1.20 combination even though the Nuxt Storybook 9.0.1
packages declare an older Storybook peer range.

## Observations from isolated comparisons

- The equivalent Nuxt 4.4.8 / Vite 7 setup works.
- Aligning Storybook and its internal packages to 9.0.18 does not remove this
  error.
- Removing the separate `@rollup/plugin-replace` added by
  `@storybook-vue/nuxt` does not remove this error.
- With all dependency versions and the lockfile unchanged, removing only the
  `nuxt:replace` plugin from Nuxt 4.5.1's `@nuxt/vite-builder` makes the preview
  work.

The last item is a diagnostic result, not a proposed workaround. It narrows the
trigger to the interaction between Nuxt 4.5.1's `nuxt:replace` plugin and the
Vite 8 / Rolldown path. Determining the appropriate upstream fix still requires
maintainer input.
