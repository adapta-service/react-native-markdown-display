# Dependency Maintenance Plan

Updated: 2026-03-30

## Scope

This document tracks runtime dependencies in `@adapta-service/react-native-markdown-display` that show more than 3 years without a new release and defines a practical plan to replace, remove, or contain them.

The current runtime dependencies are:

- `css-to-react-native@^3.2.0`
- `markdown-it@^14.1.1`
- `prop-types@^15.7.2`

`markdown-it` is active and should be kept. The other three need review.

## Aging Dependencies

| Dependency | Current Version | Last Release | Age | Priority | Current Role |
| --- | --- | --- | --- | --- | --- |
| `prop-types` | `15.7.2` | 2022-01-05 | 4+ years | Medium | Runtime prop validation for `Markdown` |
| `css-to-react-native` | `3.2.0` | 2023-02-14 | 3+ years | Medium | Converts inline style strings from markdown attributes |

## Priority Order

1. Reduce or remove `prop-types`
2. Evaluate whether `css-to-react-native` should remain runtime code

## Completed: `react-native-fit-image`

### Status

Removed in `8.1.2` and replaced with an internal `Image`-based renderer.

### Outcome

- The package no longer depends on `react-native-fit-image`.
- Markdown images now render through an internal component that measures aspect ratio on load and uses `resizeMode="contain"`.
- The public `rules.image` override path remains available for consumers who need a custom image implementation.

### Follow-up validation

- Test long images, broken URLs, data URIs, and remote markdown images in consuming apps.
- Compare the default behavior with previous releases on iOS and Android.

## 1. `prop-types`

### Why it matters

- It is stable but old, and the package already publishes TypeScript definitions.
- The runtime validation is useful for plain JavaScript consumers, but it adds dependency surface that may not justify its value long term.

### Current usage

`prop-types` is used only in `src/index.js` to define `Markdown.propTypes`.

### Target outcome

Reduce or eliminate runtime prop validation as part of a future cleanup release.

### Recommended implementation path

Phase 1:

- Keep `prop-types` in the short term to avoid a silent downgrade for JavaScript consumers.
- Improve README and typings so TypeScript users rely on the typed surface rather than runtime validation.

Phase 2:

- Decide whether the library still wants first-class JavaScript runtime validation.
- If not, remove `Markdown.propTypes` and drop `prop-types` in the next major version.

### Risk

- Low for TypeScript consumers.
- Medium for JavaScript consumers who rely on runtime validation warnings.

## 2. `css-to-react-native`

### Why it matters

- It crossed the 3-year threshold but is not as stale as the others.
- It only exists to support inline style strings coming from markdown token attributes.

### Current usage

The package is used by `src/lib/util/convertAdditionalStyles.js`.

### Target outcome

Either keep it intentionally or replace it with a narrower internal implementation if the supported style subset is small.

### Recommended implementation path

Phase 1:

- Audit which markdown attribute styles are actually supported and needed.
- Document the supported subset of inline styles.

Phase 2:

- If the supported subset is small, replace `css-to-react-native` with a local parser for that subset.
- If the supported subset is broad, keep the package and re-evaluate only if compatibility or security issues appear.

### Risk

- Low to Medium. Replacing this carelessly can break markdown content that depends on inline style parsing.

## Release Strategy

### Short term: 8.x

- Keep `css-to-react-native`.
- Keep `prop-types`.
- Validate the new internal image renderer in consuming apps.

### Medium term: 9.0

- Consider removing `prop-types`.
- Consider narrowing inline style support if `css-to-react-native` is replaced.

## Acceptance Criteria

Any dependency replacement should meet all of these conditions:

- `npm audit` remains clean.
- `npm run lint` passes.
- `npm pack --dry-run` passes.
- Public API remains compatible unless the release is explicitly major.
- The consuming app renders headings, links, lists, code blocks, and images without regression.

## Suggested Next Work Items

1. Add screenshot or snapshot verification for markdown images.
2. Decide whether `prop-types` is still part of the support policy for JavaScript consumers.
3. Document the supported inline style behavior before touching `css-to-react-native`.
