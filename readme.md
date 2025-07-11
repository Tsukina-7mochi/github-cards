# GitHub Cards

![](https://img.shields.io/npm/v/%40tsukina-7mochi%2Fgithub-cards)
![](https://jsr.io/badges/@tsukina-7mochi/github-cards)

A cutting-edge library designed to enhance the presentation of GitHub repositories and user profiles on your website. With minimal setup, you can embed dynamic, beautifully designed summaries of GitHub repositories that include key details such as descriptions, stars, forks, licenses, and topics. Built on modern [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) technology, this library is both easy to use and highly customizable.

## Features

- **Comprehensive Repository Information**: Display essential details like description, stars, forks, license, language, topics and user avatar.
- **Beautiful Design**: Out-of-the-box aesthetics that enhance the visual appeal of your website.
- **Easy Integration**: Simply include a `<script>` tag and use the custom element.
- **Customization**: Use CSS variables to customize the appearance and seamlessly integrate with your website's style.
- **Performance Optimization**: Caches responses from the GitHub API to avoid rate limits and uses the Cache API and Lock API to efficiently manage requests, even across sessions.

### Feature plans

- Implement a card for GitHub users to display user profiles with details such as follower count, repository count, and more.

## Demo

![repository card (light)](./docs/repo-card-light.png)

![repository card (dark)](./docs/repo-card-dark.png)

Check out this live demo to see GitHub Repo Cards in action:

https://tsukina-7mochi.github.io/github-cards/

## Usage

### CDN
 
You can import script from CDN `esm.sh`. Add the following `<script>` tag to your HTML document to load library:

```typescript
<script type="module" async src="https://esm.sh/@tsukina-7mochi/github-cards"></script>
```

Use the `<gh-repo-card>` custom element wherever you want to display a GitHub repository card:

```html
<gh-repo-card name="Tsukina-7mochi/github-cards></gh-repo-card>
```

See `docs` directory for demonstration page implementation.

### npm

You can simply import this library instead of loading from CDN:

```typescript
require('@tsukina-7mochi/github-cards`);
// or
import '@tsukina-7mochi/github-cards`;
```

### jsr

See https://jsr.io/@tsukina-7mochi/github-cards.

## API

### gh-repo-card

Attributes

| Attribute        | Description                              |
| ---------------- | ---------------------------------------- |
| `name`           | Repository name (`owner/repo`, required) |
| `no-avatar`      | Do not show avatar of repository owner   |
| `no-fork-source` | Do not show fork source                  |
| `no-description` | Do not show repository description       |
| `no-stars`       | Do not show stars count                  |
| `no-forks`       | Do not show forks count                  |
| `no-license`     | Do not show license                      |
| `no-language`    | Do not show language                     |
| `no-topics`      | Do not show topics/tags                  |

[Parts](https://developer.mozilla.org/docs/Web/HTML/Reference/Global_attributes/part)

- `avatar`
- `description`
- `forks`
- `fork-source`
- `wrapper`
- `license`
- `stars`
- `language`
- `language-color`
- `repo-name`
- `topics`

CSS Variables

| Variable Name | Description |
| --------------------------- | ------------------------------- |
| `--color-background`        | Background color                |
| `--color-background-hover`  | Background color when `:hover`  |
| `--color-background-active` | Background color when `:active` |
| `--color-text-primary`      | Primary text color              |
| `--color-text-secondary`    | Secondary text color            |
| `--color-text-link`         | Link text color                 |
| `--color-border`            | Border color                    |
| `--radius`                  | Border radius                   |
| `--size-avatar`             | Avatar size                     |

## Thanks

- [tarptaeya/repo-card](https://github.com/tarptaeya/repo-card) for reference the specification and design.
- [ozh/github-colors](https://github.com/ozh/github-colors) for providing language colors.
