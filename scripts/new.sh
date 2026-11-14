#!/bin/sh
# Start a new post or project from _templates/, as a draft.
#
#   scripts/new.sh post "What is go.mod?"     -> _blogs/what-is-go-mod.md
#   scripts/new.sh project "Chat app"         -> _projects/chat-app.md
set -eu

usage() { echo 'usage: scripts/new.sh post|project "Title"' >&2; exit 1; }
[ $# -ge 2 ] || usage

kind=$1; shift
title=$*
case $kind in
  post)    dir=_blogs ;;
  project) dir=_projects ;;
  *)       usage ;;
esac

root=$(cd "$(dirname "$0")/.." && pwd)

# "What is go.mod?" -> "what-is-go-mod"
slug=$(printf '%s' "$title" | tr '[:upper:]' '[:lower:]' | sed -e "s/'//g" -e 's/[^a-z0-9]\{1,\}/-/g' -e 's/^-//' -e 's/-$//')
[ -n "$slug" ] || { echo "error: the title needs at least one letter or number" >&2; exit 1; }

file=$dir/$slug.md
[ ! -e "$root/$file" ] || { echo "error: $file already exists, pick another title" >&2; exit 1; }

# Escape for a double-quoted YAML string, then for the sed replacement.
yaml_title=$(printf '%s' "$title" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g')
sed_title=$(printf '%s' "$yaml_title" | sed -e 's/[\\&|]/\\&/g')

sed -e "s|{{TITLE}}|$sed_title|" -e "s|{{DATE}}|$(date +%F)|" \
  "$root/_templates/$kind.md" > "$root/$file"

echo "Created $file (a draft)."
echo "Preview:  make drafts   (or: bundle exec jekyll serve --unpublished)"
echo "Publish:  set 'published: true', then commit and push."
