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
_templates/          starting point for new posts and projects
scripts/             new.sh (scaffold) · check.sh (front-matter check, also run by GitHub Actions)
docs/WRITING.md      writing guide
```

## Writing

```sh
make post title="My post title"     # new draft in _blogs/
make project title="My Project"     # new draft in _projects/
make check                          # catch front-matter mistakes
make drafts                         # preview, drafts included
```

Writing straight on github.com, front-matter fields and a formatting cheat sheet: [docs/WRITING.md](docs/WRITING.md).
