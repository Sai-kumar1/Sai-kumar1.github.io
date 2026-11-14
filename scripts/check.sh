#!/bin/sh
# Check posts and projects for common front-matter mistakes before publishing.
#   scripts/check.sh            check everything in _blogs/ and _projects/
#   scripts/check.sh FILE...    check only these files
# Prints one line per problem and exits 1 if there are any.
set -u

root=$(cd "$(dirname "$0")/.." && pwd)
cd "$root" || exit 1

if [ $# -eq 0 ]; then
  set --
  for f in _blogs/*.md _projects/*.md; do [ -e "$f" ] && set -- "$@" "$f"; done
fi
checked=$#

problems=0
say() {
  # On GitHub Actions, also annotate the file so the error shows on the commit.
  if [ -n "${GITHUB_ACTIONS:-}" ]; then echo "::error file=$1::$2"; fi
  echo "$1: $2"
  problems=$((problems + 1))
}

for f in "$@"; do
  [ -f "$f" ] || { say "$f" "file not found"; continue; }

  name=$(basename "$f")
  case $name in
    *[A-Z\ ]*) say "$f" "file name has capitals or spaces (it becomes the URL); use lowercase-with-dashes.md" ;;
  esac

  if [ "$(head -n 1 "$f")" != "---" ]; then
    say "$f" "must start with a '---' line (front matter)"
    continue
  fi
  # Front matter = lines between the first and second '---'
  fm=$(awk 'NR == 1 { next } /^---[[:space:]]*$/ { exit } { print }' "$f")
  if [ "$(awk '/^---[[:space:]]*$/ { n++ } END { print n + 0 }' "$f")" -lt 2 ]; then
    say "$f" "front matter is not closed with a second '---' line"
    continue
  fi

  field() { printf '%s\n' "$fm" | sed -n "s/^$1:[[:space:]]*//p" | sed 's/[[:space:]]*#.*$//' | head -n 1; }

  title=$(printf '%s\n' "$fm" | sed -n 's/^title:[[:space:]]*//p' | head -n 1)
  if [ -z "$title" ]; then
    say "$f" "missing title"
  else
    case $title in
      \"*|\'*) ;;
      *": "*) say "$f" "title contains ': ' so it must be in quotes, e.g. title: \"$title\"" ;;
    esac
  fi

  date=$(field date)
  if [ -z "$date" ]; then
    say "$f" "missing date (without it the post's date changes on every deploy); add e.g. date: $(date +%F)"
  elif ! printf '%s' "$date" | grep -Eq '^[0-9]{4}-[0-9]{2}-[0-9]{2}([ T][0-9:+-]+)?$'; then
    say "$f" "date '$date' should look like YYYY-MM-DD"
  fi

  published=$(field published)
  case $published in
    true|false) ;;
    "") say "$f" "missing 'published: true' (or false for a draft)" ;;
    *)  say "$f" "published should be true or false, not '$published'" ;;
  esac

  if printf '%s\n' "$fm" | grep -q "$(printf '\t')"; then
    say "$f" "front matter contains a tab; use spaces"
  fi
done

if [ "$problems" -eq 0 ]; then
  echo "All good: $checked file(s) checked."
else
  echo "$problems problem(s) found."
  exit 1
fi
