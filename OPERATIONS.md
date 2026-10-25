# Operations

Printable Game Maker runs with no human in the loop. This file lists every automated job, how each one fails safely, what to watch, and the keys a human can turn later.

**Live:** https://theguysaccount.github.io/ai-board-game-maker/ (GitHub Pages, deployed by Actions from `main`).

## Automated jobs

| Job | File | When | What it does | How it fails safely |
|---|---|---|---|---|
| Build, test and deploy | `.github/workflows/deploy.yml` | every push to `main`; **weekly, Mondays 06:29 UTC**; by hand | 21 unit and build tests (every game × every topic × Letter and A4) → build → share cards → **end-to-end self-test in headless Chrome** (every page on desktop and phone, all 8 games in the editor, a pasted list, a too-short list, share links, bingo caller, memory) → **sample PDFs for every game checked by `qpdf --check` and rendered by `pdftoppm`** → deploy → live smoke test → IndexNow for changed pages | Any failed step stops before `deploy`; the last good site stays live. Smoke test and IndexNow run after deploy and never roll back; IndexNow errors are ignored. |
| Weekly content | same workflow, scheduled run | Mondays | publishes every topic in `src/content/packs.js` whose `publish` date has arrived: a new topic page, share card, sitemap entry, editor option and IndexNow ping | A topic that breaks a test is never published. |
| Weekly sample PDFs | same workflow | every run | uploads `selftest-out/` (this week's topic as a PDF for every game, rendered first pages, screenshots, `report.txt`) as artifact `selftest-<n>`, kept 30 days | Read-only. |
| Site health | `.github/workflows/health.yml` | **daily, 09:53 UTC**; by hand | fetches every sitemap page and every file it links to | Never changes the site. Opens one issue labelled `site-health` on failure, comments while it persists, closes it on recovery. |
| Keep-alive | `.github/scripts/keepalive.sh`, in both scheduled workflows | every scheduled run | re-enables every workflow via the API; pushes an empty commit if the last commit is 45+ days old, so GitHub's 60-day rule never disables the schedules | Runs even when the build fails. Pushes made with `GITHUB_TOKEN` never trigger workflows, so it cannot loop. |

Backlog: 18 topics, one per Monday from 2026-11-02 to 2027-03-01. After that the weekly job keeps rebuilding and self-testing with no new topic until more are added (see "Content routine").

## What to watch

- **Actions tab**: https://github.com/theguysaccount/ai-board-game-maker/actions. A red weekly run means nothing deployed that week; the site is unchanged. GitHub emails failures of scheduled runs to the account owner.
- **Issues labelled `site-health`**: an open one means a page or file is broken on the live site right now.
- **Self-test artifacts**: the latest `selftest-<n>` artifact holds this week's sample PDFs for all eight games; open one to see exactly what a teacher downloads.
- **Analytics** (after the GoatCounter key): the activation event is `pdf_download` (also `pdf_<game>`); others are `game_<id>`, `pack_loaded`, `pasted`, `share`, `share_opened`, `play_caller`, `play_memory`, `memory_finished`.

## Recovering by hand

- Bad deploy that passed every test: re-run the last good "Build, test and deploy" run ("Re-run all jobs" redeploys that commit), or `git revert` and push.
- A schedule GitHub disabled anyway: Actions → the workflow → "Enable workflow", then "Run workflow".
- Locally: `npm test && node scripts/build.mjs && node scripts/og.mjs && node scripts/selftest.mjs`.

## Keys Jack can turn later

### 1. A custom domain

Candidates (no domain in the 2026-08-30 portfolio is a strong fit; availability checked by public RDAP on 2026-10-25):

1. **printablegamemaker.com** (unregistered): the product name and the search phrase.
2. **playcampground.com** (already owned; unassigned in the portfolio, auto-renew off, expires 2027-05-17): free to use today, but a weak name for this; better as a 301 redirect.
3. **printablegames.app** (unregistered): short; `.app` forces HTTPS.

Steps once chosen (buying is the only part that costs money and needs a human):
1. DNS at the registrar: four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; four `AAAA` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`; `CNAME` `www` → `theguysaccount.github.io`.
2. `gh api -X PUT repos/theguysaccount/ai-board-game-maker/pages -f cname=printablegamemaker.com`, then enable "Enforce HTTPS" in Settings → Pages once the certificate is issued.
3. `gh variable set PGM_SITE_URL --body https://printablegamemaker.com --repo theguysaccount/ai-board-game-maker`, then run the deploy workflow. The build moves from `/ai-board-game-maker/` to the root by itself, and the self-test follows it.
4. Optional: Google Search Console via a DNS `TXT` record; submit `/sitemap.xml`. IndexNow engines are already notified on every deploy.

### 2. Money: printed, boxed copies

GitHub Pages is for non-commercial sites, so the shop slot is **off**. To switch it on:
1. Move hosting to Cloudflare Pages (free, commercial use allowed): connect this repo, build command `node scripts/build.mjs && node scripts/og.mjs`, output `dist`, variable `PGM_BASE_URL=https://<domain>`; point the custom domain there.
2. Open an account with a custom board-game printer that accepts uploaded print files (card decks, game boards, boxes) and set up a storefront or order page for "print my game".
3. Set the repository variable `PGM_SHOP_URL` (Cloudflare: the same project variable) to that page and redeploy. The editor then shows "Want a boxed copy? Order a printed copy" under the download buttons.

Lighter option that fits Pages today: `PGM_SUPPORT_URL` set to a GitHub Sponsors or Buy Me a Coffee page adds "Support this free tool" to the footer.

### 3. Privacy-respecting analytics

Create a free GoatCounter site (no cookies), then `gh variable set PGM_GOATCOUNTER --body https://<code>.goatcounter.com/count --repo theguysaccount/ai-board-game-maker` and redeploy. Do Not Track and Global Privacy Control are honored.

### 4. Content routine (topics after March 2027)

AI-written content can't run inside Actions (no API key). Schedule a monthly Claude Code routine on this repository:

> In theguysaccount/ai-board-game-maker, append four new topic packs to `src/content/packs.js`, one for each of the next four Mondays after the last `publish` date. Pick subjects not yet covered that teachers or party hosts search for. Each needs 20–24 clue/answer pairs with unique answers and accurate, checkable facts (no contested claims), a level, and an original 60–90 word intro in the style of the existing ones. Run `npm test && node scripts/build.mjs && node scripts/og.mjs && node scripts/selftest.mjs`, fix anything that fails (the tests check every character exists in the fonts and every game builds), and open a pull request.

### 5. Root robots.txt (optional)

A `theguysaccount/theguysaccount.github.io` repo with a root `robots.txt` listing each project's sitemap would let crawlers find sitemaps directly. It is a separate public repo, so it is left for a human. A custom domain also fixes it.

## Configuration reference

| Variable | Where | Effect |
|---|---|---|
| `PGM_SITE_URL` | repo variable | public base URL; default `https://theguysaccount.github.io/ai-board-game-maker` |
| `PGM_SHOP_URL` | repo variable | shows the "order a printed copy" slot (only after moving off Pages) |
| `PGM_SUPPORT_URL` | repo variable | footer support link |
| `PGM_GOATCOUNTER` | repo variable | cookieless analytics |
| `PGM_TODAY`, `PGM_OUT` | env, local only | build as of another date; build into another folder |
