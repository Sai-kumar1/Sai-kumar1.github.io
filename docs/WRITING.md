# Writing guide

Everything you need to write and publish a post or project by hand:
straight on github.com, or on the laptop with a text editor and git.

## 1. Write a post on github.com (no tools needed)

**Copy the template**
1. In the repo, open `_templates/` → `post.md` (or `project.md` for a project).
2. Click the **Copy raw file** icon (top right of the file).

**Create the post**
1. Open the `_blogs/` folder (`_projects/` for a project).
2. Click **Add file → Create new file**.
3. Name it like `learning-go-channels.md`: lowercase, dashes, ending in `.md`.
   The name becomes the URL: `/blog/learning-go-channels/`.
4. Paste the template.

**Fill in the top part**
- Replace `{{TITLE}}` with your title. Keep the quotes around it.
- Replace `{{DATE}}` with today's date, e.g. `2026-11-15`.
- Optional: write a one-sentence `description:` and some `tags: [go]`.

**Write**
- Delete the example text under the second `---` and write your post.
- The **Preview** tab shows how the text will look.

**Save**
- Ready to publish? Change `published: false` to `published: true`, then **Commit changes**. It goes live in a minute or two.
- Not finished? Leave `published: false` and commit. It's saved but hidden.
- Edit later: open the file and click the pencil icon.

**Did it work?** After each commit, GitHub checks the post. A green ✓ next to
the commit means it's fine. A red ❌ (plus an email) means something needs
fixing. Click it, then **Check front matter**, to see the file and the fix.

## 2. Or: write on the laptop

```sh
make post title="Learning Go channels"   # creates _blogs/learning-go-channels.md (draft)
make drafts                               # preview at http://localhost:4000, drafts included
make check                                # same check GitHub runs
git add -A && git commit -m "Add post: Learning Go channels" && git push
```

Without `make`: `scripts/new.sh post "Learning Go channels"`.

## 3. Front matter (the block between the `---` lines)

### Posts (`_blogs/`)

| Field | Needed? | Example | Notes |
|---|---|---|---|
| `title` | yes | `"What is go.mod?"` | Keep the quotes if it contains a colon `:` |
| `date` | **yes** | `2026-11-14` | `YYYY-MM-DD`. Without it the date changes on every deploy |
| `published` | **yes** | `true` / `false` | `false` = draft |
| `description` | no | `One sentence summary.` | Shown in lists and link previews. Blank = first paragraph |
| `tags` | no | `[go, modules]` | Used by the tag filter on /blog/ |
| `math` | no | `true` | Only if the post uses math (see below) |

### Projects (`_projects/`)

| Field | Needed? | Example | Notes |
|---|---|---|---|
| `title`, `date`, `published` | yes | | Same as posts. `date` = when you started |
| `summary` | no | `A real-time chat app.` | Card text. Blank = first paragraph |
| `stack` | no | `[Go, Redis]` | |
| `repo` / `demo` | no | `https://github.com/...` | Leave blank to hide the button |
| `status` | no | `active`, `in progress`, `archived` | |
| `featured` | no | `true` | Also show on the home page |

Leave an optional field blank (`description:`) or delete the line. Don't use `""`.

## 4. Formatting cheat sheet

````markdown
## Section heading          ← every ## and ### goes in "On this page"
### Smaller heading            (the list appears once there are 3 or more)

**bold**, *italic*, `inline code`, [a link](https://example.com)

- bullet
- list

1. numbered
2. list

```go
// code block: put the language after the backticks for colours
fmt.Println("hello")
```

> A callout box for tips and warnings.
{: .note}

> A plain quote (no {: .note} line).

| Column | Column |
|--------|--------|
| cell   | cell   |

A sentence with a footnote.[^1]

[^1]: The footnote text, shown at the bottom of the post.

---                          ← a horizontal divider
````

Math (set `math: true` in the front matter first):

```markdown
Inline: $$E = mc^2$$

On its own line:

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

Code languages that colour well: `go`, `python`, `js`, `ts`, `rust`, `java`, `c`, `sql`, `sh`, `yaml`, `json`, `html`, `css`.

## 5. Common mistakes

| Symptom | Cause | Fix |
|---|---|---|
| Build fails / post missing | `title: Go: a tour` (unquoted colon) | `title: "Go: a tour"` |
| Post doesn't show up | `published: false`, or it's still a draft | Set `published: true` |
| Post date is "today" and keeps changing | No `date` | Add `date: YYYY-MM-DD` |
| Build fails with a YAML error | Tab character in the front matter | Use spaces |
| Odd URL | Capitals or spaces in the file name | Rename to `lowercase-with-dashes.md` |
| No "On this page" list | Fewer than 3 headings | Add `##` sections, or that's fine for short posts |

The check (the ✓/❌ on GitHub, or `make check` on the laptop) catches all of the front-matter mistakes in this table.
