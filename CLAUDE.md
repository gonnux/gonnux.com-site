# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the Next.js application for gonnux.com personal blog. It reads Obsidian vault content from the parent directory and renders published notes as blog posts.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (requires environment variables)
OBSIDIAN_DIR=.. CONFIG_YAML=../config.yaml pnpm dev

# Production build (runs ESLint first)
OBSIDIAN_DIR=.. CONFIG_YAML=../config.yaml pnpm build

# Lint only
pnpm lint
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OBSIDIAN_DIR` | Path to Obsidian vault directory (default: `obsidian`) |
| `CONFIG_YAML` | Path to config.yaml (site config, apps, projects) (default: `config.yaml`) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense ID |
| `NEXT_PUBLIC_DISQUS_SHORTNAME` | Disqus comments integration |
| `NEXT_PUBLIC_GIT_COMMIT_HASH` | Git commit hash for footer |

## Architecture

### Tech Stack
- **Next.js 16** with Pages Router (not App Router)
- **React 19** + **TypeScript 5**
- **MUI 7** (Material UI) with Emotion CSS-in-JS
- **Tailwind CSS v4** with `@tailwindcss/typography` (prose classes for markdown)
- **marked v17** + **highlight.js** for Markdown rendering

### Directory Structure
```
src/
├── pages/           # Next.js Pages Router
│   ├── _app.tsx     # App wrapper (ThemeProvider, ColorModeProvider)
│   ├── _document.tsx
│   ├── blog/        # Dynamic route: [slug].tsx
│   └── projects/    # Dynamic route: [name].tsx
├── components/      # React components (MUI-based)
├── contexts/        # ColorModeContext for dark/light theme toggle
├── types/           # TypeScript types (NextLayoutPage)
├── utils/           # Helpers (date formatting, URL generation, sorting)
├── blog.ts          # Blog post loader - reads from OBSIDIAN_DIR
├── config.ts        # Config loader - reads from CONFIG_YAML
├── obsidian.ts      # Obsidian wiki-link / embed transformation
└── marked.ts        # Markdown parser config with syntax highlighting
```

### Key Patterns

**Per-page layouts**: Pages use `NextLayoutPage` type and `getLayout` pattern:
```tsx
const MyPage: NextLayoutPage<Props> = (props) => { ... }
MyPage.getLayout = (page) => <Layout>{page}</Layout>
```

**Theme toggle**: `ColorModeContext` provides `colorMode` ('light'|'dark') and `toggleColorMode()`. Default is dark mode.

**Markdown rendering pipeline**:
1. `blog.ts` scans OBSIDIAN_DIR for notes with `publish: true` in frontmatter
2. `obsidian.ts` transforms `[[wiki-links]]` and `![[embeds]]` to HTML
3. `marked.ts` converts markdown to HTML with highlight.js syntax highlighting
4. `html-react-parser` renders HTML in React inside `<Box className="prose prose-lg dark:prose-invert">`

**Static generation**: All pages use `getStaticProps`/`getStaticPaths` for full static export with `output: 'standalone'`.

## Blog Content Source

Notes are sourced from the Obsidian vault (`OBSIDIAN_DIR`). Only notes with `publish: true` in frontmatter are included. The note's filename (without `.md`) becomes the URL slug at `/blog/[slug]`.
