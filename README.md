# sai-kumar1.github.io

My portfolio and blog, where I post what I learn. Built with Jekyll and hosted on GitHub Pages: <https://sai-kumar1.github.io>

## Run locally

```sh
bundle install
bundle exec jekyll serve --livereload            # http://localhost:4000
bundle exec jekyll serve --unpublished           # also show drafts (published: false)
```

## Structure

```
_config.yml          site settings, author/social links, plugins, front-matter defaults
_data/navigation.yml header navigation
_blogs/              blog posts        → /blog/<file-name>/
_projects/           projects          → /project/<file-name>/
_layouts/            default · home · page · post · project
_includes/           head, header, footer, post-card, project-card, reading-time
_sass/               design tokens, base, layout, components, prose, syntax
assets/css/main.scss stylesheet entry point
assets/js/main.js    theme toggle, TOC, heading anchors, code copy, progress bar, tag filter
index.md · blog.html · projects.html · 404.html
```

## Writing a post

Create `_blogs/my-post.md` (the file name becomes the URL):

```yaml
---
title: My post title
date: 2026-01-31
description: One-sentence summary shown in lists and link previews.
tags: [go, systems]
published: true      # false = draft
math: false          # true loads MathJax
---
```

- `## Headings` build the table of contents (shown when a post has 3 or more).
- For a callout, put `{: .note}` on the line after a `> quote`.
- Fenced code blocks with a language (```` ```go ````) get syntax highlighting and a copy button.

## Adding a project

Create `_projects/my-project.md`:

```yaml
---
title: My Project
date: 2026-01-31
summary: Short description for the card.
stack: [Go, Redis]
repo: https://github.com/…
demo: https://…
status: active        # active · in progress · archived
featured: true        # show on the home page
published: true
---
```
