# GitHub Cards

[Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) implementation of cards for GitHub
repositories.

## Demo

TODO: add link to demonstration page

## Usage

You can import script from CDN `esm.sh`. Put `<script>` tag with `type="module"`:

```typescript
<script type="module" async src="https://esm.sh/@tsukina-7mochi/github-cards"></script>
```

then you can use custom component on your website:

```html
<gh-repo-card name="Tsukina-7mochi/github-cards></gh-repo-card>
```

See more example in `docs` directory.

## API

### gh-repo-card

Attributes

| attribute        | description                                                   |
| ---------------- | ------------------------------------------------------------- |
| `name`           | Repository name e.g. `Tsukina-7mochi/github-cards` (required) |
| `no-avatar`      | Set true to hide user avatar                                  |
| `no-description` | Set true to hide repository description                       |
| `no-stars`       | Set true to hide stars count                                  |
| `no-forks`       | Set true to hide forks count                                  |
| `no-license`     | Set true to hide license                                      |
| `no-language`    | Set true to hide language                                     |
| `no-topics`      | Set true to hide topics                                       |

## Customizations

### CSS colors

| CSS variable                        | default           | description                           |
| ----------------------------------- | ----------------- | ------------------------------------- |
| `--gh-card-color-border`            | `#c0c0c0`         | Border color                          |
| `--gh-card-color-background-hover`  | `rgb(0 0 0 / 3%)` | Background color of card when hovered |
| `--gh-card-color-background-active` | `rgb(0 0 0 / 5%)` | Background color of card when active  |
| `--gh-card-color-fg`                | `#404040`         | Foreground (text) color               |
| `--gh-card-color-fg-2`              | `#808080`         | Foreground color (light)              |
| `--gh-card-color-link`              | `#646cff`         | Color of link text                    |

## Thanks

- [tarptaeya/repo-card](https://github.com/tarptaeya/repo-card) for reference the specification and design.
- [ozh/github-colors](https://github.com/ozh/github-colors) for providing language colors.
