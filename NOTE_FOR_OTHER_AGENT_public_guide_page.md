# Note for the other agent (MCP guide / LF CR Summary Fluent): what changed on perelandra on 2026-11-16 and what to reflect

Written by Claude for Leo. Read this before touching the guide pages or your update set. Nothing below changed your app.

## 1. What Leo asked

Make https://perelandra.service-now.com/x_snc_forecast_v_0_wdf_lab.do (the WDF Lab guide, app Forecast Variance, scope `x_snc_forecast_v_0`) public, like your `x_snc_lf_cr_summ_0_mcp_guide.do`.

## 2. How a page becomes public here (copy of your pattern)

A page is public when a Public Pages record exists: table `sys_public` (Public Pages), field `page` = the endpoint without ".do", `active` = true. Your guide has `page = x_snc_lf_cr_summ_0_mcp_guide` (sys_id d9475e8a64c34d4bafe73b407d44a0ea) and `x_snc_lf_cr_summ_0_mcp_clab` (6aefbb9907634b0e92e59fc2d875fe21). I only READ your page with an anonymous GET and a headless browser. I did not change your page, your records, your scope or your files.

## 3. What I did on perelandra (final state)

| Item | Final state |
|---|---|
| `sys_public` for `x_snc_forecast_v_0_wdf_lab` | exactly one record, sys_id `6b4470b665325971540deb7daf4e8d62`, active, scope Forecast Variance. Delivered by a source deploy (page-only package), not by hand. Source file: `src/fluent/public-pages/wdf-lab-public.now.ts` (Record on table sys_public). |
| Anonymous visit of `x_snc_forecast_v_0_wdf_lab.do` | the page and text load with no login |
| Your `x_snc_lf_cr_summ_0_mcp_guide.do` | still answers 200, untouched |
| The admin user's current application and update set | unchanged: "LF CR Summary Fluent" and "default 2 [LF CR Summary Fluent]" |

## 4. The mess I made, and its cleanup (so you are not confused by what you may have seen)

I first created the Public Pages record through the REST Table API. That API writes into the admin's current application, which is YOURS (LF CR Summary Fluent), and into your current update set "default 2". For a short time (about 18:04 to 18:20 instance time, 2026-11-15) you had:

- a `sys_public` record for `x_snc_forecast_v_0_wdf_lab` in YOUR scope (ids c56ec78e33ec5390cdcc4f945d5c7b18, then a33093823b2c17902366099ea3e45a20),
- two entries in YOUR update set "default 2" for them (sys_update_xml ids c96ec78e33ec5390cdcc4f945d5c7b1f and 6b3093823b2c17902366099ea3e45a26).

I deleted both records and both update set entries by exact sys_id after checking them (I created all four). Verified afterwards: zero entries left for them, and the only record for the page is the Forecast Variance one above. If you see anything else in "default 2" mentioning `wdf_lab`, it is not intentional: remove it and tell Leo.

I also called the concourse picker (change application) twice on the admin user. The reading before and after both showed LF CR Summary Fluent, so no change took effect.

Rule for you and for me: do not use the Table API for records that must live in another app. It writes into the current application and update set.

## 5. What is still wrong (the image problem) and what to change in code

The guide text is public, but the images are not: 32 of 33 images on the MCP page are broken for a visitor with no login. Cause: the guide images are `sys_attachment` files on `x_snc_forecast_v_0_lab_asset` records, served by `/sys_attachment.do?sys_id=...`, which redirects a guest to the login page.

Your page avoids this: it embeds every image as a base64 `data:image/...` URI (100 images, 0 broken when anonymous). That is the proven pattern here.

For the code agent (Fluent / src/client), choose ONE:

1. (recommended, same as your page) At bundle time, in `scripts/gen-lab-bundle.mjs` and `src/client/content/asset-map.ts`, replace each attachment URL by a data URI built from `lab-guide/assets/<name>.png`. Do it per exercise page, loaded on demand, because 282 images are about 10 MB of binary (13 MB base64): do not put them all in one script. Keep `lab-markdown.ts` text-only.
2. Store the images as `db_image` records, which the platform serves without login.
3. Open guest read access on the lab asset attachments with ACLs. TESTED 2026-11-16 AND IT DOES NOT WORK: with a read rule on `x_snc_forecast_v_0_lab_asset` a visitor with no login is still redirected to the login page (HTTP 302) for any `/sys_attachment.do` download. Do not retry it.

Do not change `x_snc_lf_cr_summ_0_mcp_guide`. After a change, test with a fresh browser with NO login: `node clabs_run/pub7.cjs` (all 13 pages, no login and logged in), then run the page-only deploy as described in OPEN_ITEMS item 22 and open `/cache.do` once.

## 6. Where this is factored in

- Source: `src/fluent/public-pages/wdf-lab-public.now.ts` (and the same file in `Forecast-Variance-Lab-Update-Set/src/fluent/public-pages/`).
- XML build: `Forecast-Variance-Lab-Update-Set/scripts/make_update_set.py` has the same record (same sys_id, scope Forecast Variance) in `EXTRA_RECORDS`; the XML now has 1,553 records.
- Handoff: OPEN_ITEMS.md, item 29 and the handoff steps.

## 7. Update, later the same day: study of the page that works, and what is left on the instance

**Study of `x_snc_lf_cr_summ_0_mcp_clab.do` (works for a visitor with no login).** Loaded anonymously: one document of 2.3 KB plus 28 scripts and 1 stylesheet, all HTTP 200, and nothing else is requested. It shows 58 images, all embedded in the page as `data:` URIs, 0 broken. No attachment URLs, no table API calls, no separate asset files. So that page is self-contained. This is the pattern to copy for `x_snc_forecast_v_0_wdf_lab`; do not look for an instance-side fix, there is none that works (attachments, ACL rule: both tested).

**What a visitor with no login sees on our page today:** 282 guide images are all login-protected attachments (40 of 41 broken on the Zero Copy page, 32 of 33 on the MCP page); the home animation does not run (`scene.js` returns 500 under `/uxasset/externals/...` and 404 under `/wdf-lab/public/...`, and the client reads the `sys_ux_lib_asset` record through the Table API, which answers 401 to a guest). A logged-in visitor sees everything correctly (41 of 41 images on the Zero Copy page).

**Leftovers of mine on perelandra, scope Forecast Variance (both harmless, unneeded):**

| Record | sys_id | State |
|---|---|---|
| Access rule (ACL, read, no roles) on `x_snc_forecast_v_0_lab_asset` | `81fc7a948f4d4111854b1f120d6013c4` | still active, does nothing for guests |
| Second copy of that rule, created by my attempt to switch it off | `c8be0bc9129c48feb95f7a8312e27bc0` | inactive |

Delete both with a security admin (elevate `security_admin`, open each sys_id on `sys_security_acl.do`, Delete), after switching the application picker to Forecast Variance so the deletion is recorded in the right scope. I did not do it myself: a delete from the admin session would be recorded in the MCP agent's current update set, and an install rollback would undo 326 records. The one record that must stay is the Public Pages record `6b4470b665325971540deb7daf4e8d62`.

**Do not deploy again from a temporary copy of the repo to change a record that already exists:** the new copy has no `keys.ts` entry for it, so the SDK creates a NEW record with a new sys_id (this is how the second rule appeared). Deploy from the real working folder, which keeps `src/fluent/generated/keys.ts`.

## 8. RESOLVED later on 2026-11-16: the public page now shows its images and animation (MCP-page approach)

Verified on perelandra: all 307 images on the 13 guide pages load with no login (0 broken) and logged in (0 broken); the home animation runs with no login. Nothing in sections 5 and 7 about "needs a code change" is open any more except the leftovers listed below.

What was done (no change to `x_snc_lf_cr_summ_0_mcp_guide` / `_mcp_clab`):

1. `scripts/gen-public-images.py` embeds the guide images as `data:` URIs, one lazy chunk per page (`src/client/content/images/*.ts`, index `images-index.ts`). Opaque PNG screenshots are stored as JPEG (quality 82, same pixel size), PNG with transparency stays PNG, GIF animations become animated WebP when smaller. 274 unique images. Run it before every build: `python3 scripts/gen-public-images.py` (needs Pillow).
2. `src/client/content/public-images.ts` (`loadImagesFor`, `publicAsset`); `LabPage.tsx` and `Home.tsx` wait for the page's chunk before rendering; `Markdown.tsx` and `content.ts` use `publicAsset`. An image that is not embedded falls back to the old attachment URL.
3. The home animation script is bundled (`src/client/virtual-on/scene-source.ts`, loader tries it first) so a guest no longer fetches it.
4. 25 Integration Hub manual-route screenshots were hot-linked from the TypeB GitHub repo; they are now stored in `lab-guide/assets/` and embedded.
5. `now.config.json`: `packageSourceCodeOnInstance` set to false. The packaged source zip is capped at 40 MB and the embedded images exceed it. The compiled pages are not affected. Source stays in the repo.
6. Public Pages record: `src/fluent/public-pages/wdf-lab-public.now.ts` (sys_id `6b4470b665325971540deb7daf4e8d62`).

Deploy recipe (page-only, from a clean copy of the repo): copy `src/client`, `src/fluent/public-pages`, `lab-guide/assets`, `scripts/gen-public-images.py` and `now.config.json` into a worktree of HEAD that has `src/fluent/security`, `src/fluent/ui-pages` and `src/fluent/generated` replaced as in OPEN_ITEMS item 22, run `now-sdk build` and `now-sdk install --auth wdfaa --demoData false --skip-flow-activation`, open `/cache.do`, then check with `node clabs_run/pub7.cjs` (13 pages, no login and logged in).

Things that did NOT work (do not retry): a read rule on the lab image table (guests are redirected to login for attachments); static files under `public/` (the whole app is capped at 40 MB); image records `db_image` created from source with `Now.attach` (the record is created but its image file is not).

Leftovers on perelandra, scope Forecast Variance, all unneeded and harmless: access rules `81fc7a948f4d4111854b1f120d6013c4` (active) and `c8be0bc9129c48feb95f7a8312e27bc0` (inactive) on `x_snc_forecast_v_0_lab_asset`; 282 junk `db_image` records named `wdf-lab/lab-images/*` with no image file. Delete them with a security admin after switching the application picker to Forecast Variance (a delete from the admin session otherwise lands in the other agent's update set).

Build note: `pnpm build` now runs `python3 scripts/gen-public-images.py` first (needs Pillow). The generated chunks (`src/client/content/images/`, `images-index.ts`, `virtual-on/scene-source.ts`) are git-ignored because they are about 67 MB of base64. A page-only deploy from a copy of the repo must run that script (or copy the generated files) before `now-sdk build`.
