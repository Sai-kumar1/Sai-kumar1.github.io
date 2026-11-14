# Shortcuts for writing. See docs/WRITING.md.
#   make post title="My post"        new draft in _blogs/
#   make project title="My project"  new draft in _projects/
#   make check                       find front-matter mistakes
#   make serve / make drafts         preview at http://localhost:4000

.PHONY: post project check serve drafts

post project:
	@if [ -z "$$title" ]; then echo 'usage: make $@ title="Your title"'; exit 1; fi
	@scripts/new.sh $@ "$$title"

check:
	@scripts/check.sh

serve:
	bundle exec jekyll serve --livereload

drafts:
	bundle exec jekyll serve --livereload --unpublished
