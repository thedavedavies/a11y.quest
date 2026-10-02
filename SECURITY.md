# Security policy

## Reporting a vulnerability

Please report security problems privately, not in a public issue or pull request.

Use GitHub's private reporting form:
[report a vulnerability](https://github.com/thedavedavies/a11y.quest/security/advisories/new).
Only the maintainer can see what you send there.

It helps to include:

- what the problem is and what someone could do with it,
- the steps (or a URL) that reproduce it,
- the browser and device you used, if that matters.

You will get a reply once the report has been read, and credit in the fix if you would like it.

## What is in scope

- The live site at https://a11y.quest.
- The code in this repository, including the Cloudflare Worker in `worker/` that serves the
  site and renders the share-card images.
- The build and deploy pipeline in `.github/workflows/`.

a11y.quest has no accounts and no backend database. Your score and theme choice are stored
only in your own browser's localStorage.

## What is not a security issue

- A wrong answer, unclear wording, or a dead link in a question: use the in-app "report a
  problem" flag, or open a normal issue.
- An accessibility bug: open a normal issue. These matter a lot here, they just do not need to
  be private.
- Vulnerabilities in a dependency with no way to reach them through a11y.quest. Dependabot
  already tracks those.

## Supported versions

Only the latest version, the one deployed from the `main` branch, is supported. Fixes are
released by deploying a new version.
