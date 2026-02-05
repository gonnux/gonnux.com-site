# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the Next.js application for gonnux.com personal blog. It's a git submodule of `gonnux.com-site-blog/` - blog content and config.yaml are in the parent directory.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (requires environment variables)
CONFIG_YAML=../config.yaml BLOG_DIR=../blog pnpm dev

# Production build (runs ESLint first)
pnpm build

# Lint only
pnpm lint
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `CONFIG_YAML` | Path to config.yaml (site config, apps, projects) |
| `BLOG_DIR` | Path to blog posts directory |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense ID |
| `NEXT_PUBLIC_DISQUS_SHORTNAME` | Disqus comments integration |
| `NEXT_PUBLIC_GIT_COMMIT_HASH` | Git commit hash for footer |

## Architecture

### Tech Stack
- **Next.js 16** with Pages Router (not App Router)
- **React 19** + **TypeScript 5**
- **MUI 7** (Material UI) with Emotion CSS-in-JS
- **marked v17** + **highlight.js** for Markdown rendering

### Directory Structure
```
src/
├── pages/           # Next.js Pages Router
│   ├── _app.tsx     # App wrapper (ThemeProvider, ColorModeProvider)
│   ├── _document.tsx
│   ├── blog/        # Dynamic routes: [year]/[month]/[day]/[index]
│   └── projects/    # Dynamic route: [name].tsx
├── components/      # React components (MUI-based)
├── contexts/        # ColorModeContext for dark/light theme toggle
├── types/           # TypeScript types (NextLayoutPage)
├── utils/           # Helpers (date formatting, URL generation, sorting)
├── blog.ts          # Blog post loader - reads from BLOG_DIR
├── config.ts        # Config loader - reads from CONFIG_YAML
└── marked.ts        # Markdown parser config with syntax highlighting
```

### Key Patterns

**Per-page layouts**: Pages use `NextLayoutPage` type and `getLayout` pattern:
```tsx
const MyPage: NextLayoutPage<Props> = (props) => { ... }
MyPage.getLayout = (page) => <Layout>{page}</Layout>
```

**Theme toggle**: `ColorModeContext` provides `colorMode` ('light'|'dark') and `toggleColorMode()`. Default is dark mode.

**Blog URL structure**: `/blog/[year]/[month]/[day]/[index]` maps to `BLOG_DIR/[year]/[month]/[day]/[index]/[title].md`

**Static generation**: All pages use `getStaticProps`/`getStaticPaths` for full static export with `output: 'standalone'`.

## Blog Post Structure

Posts are stored in `BLOG_DIR` (default: `../blog`) with this hierarchy:
```
blog/
└── 2023/
    └── 01/
        └── 15/
            └── 1/
                └── My Post Title.md
```

The filename (without `.md`) becomes the article title.
