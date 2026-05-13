# qassemfolio

Generate a clean developer portfolio from a GitHub username in one command.

```bash
npx qassemfolio qassemadra
```

## Features

- Fetches GitHub profile data
- Shows top public repositories
- Generates a responsive static portfolio
- Includes default and terminal themes
- Works with GitHub Pages, Netlify, Vercel, or any static host

## Usage

```bash
npx qassemfolio <github-username>
```

Examples:

```bash
npx qassemfolio qassemadra
npx qassemfolio qassemadra --out ./site
npx qassemfolio qassemadra --theme terminal
npx qassemfolio roast qassemadra
```

## Local development

```bash
git clone https://github.com/qassemadra/qassemfolio.git
cd qassemfolio
npm install
npm start -- qassemadra
```

## Publish to npm

```bash
npm login
npm publish --access public
```

Then anyone can run:

```bash
npx qassemfolio qassemadra
```

## License

MIT
