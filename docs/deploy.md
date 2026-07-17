# Deploying the Acronix Books website

The site is a **static export** (`client/out/`) served by nginx on the existing
VPS (`147.93.19.105`) — the same box that runs the sync server, `acronix.in`,
and the whatsapp services. This site is deliberately **isolated** from all of
them: its own web root, its own nginx site, its own DNS names. Nothing here
touches those apps.

> Deploys are automated: push to `master` → GitHub Actions builds and rsyncs
> `out/` to the web root. The steps below are the **one-time** setup and the
> **DNS change**, which only you can do (they need registrar and root access).

---

## Architecture

```
push to master (client/** changes)
  → Actions: pnpm build  →  client/out/
  → Actions: rsync --delete out/  →  VPS:/var/www/acronixbooks.com/
nginx (acronixbooks.com, TLS via certbot)
  ├─ /            →  /var/www/acronixbooks.com   (the static site, redeployed)
  └─ /updates/    →  /var/www/acronix-updates    (installer + latest.yml, untouched)
```

**Two web roots on purpose.** The site root is wiped and rewritten on every
deploy (`rsync --delete`). The installer and `latest.yml` live in a *separate*
directory so a redeploy can never delete them. The desktop release pipeline
uploads into `/var/www/acronix-updates/`; this repo never writes there.

---

## Step 1 — Point DNS (you, at the registrar)

The apex and www currently resolve to registrar **parking** IPs. Repoint both to
the VPS:

| Record | Type | Value |
| ------ | ---- | ----- |
| `acronixbooks.com` | A | `147.93.19.105` |
| `www.acronixbooks.com` | A (or CNAME → apex) | `147.93.19.105` |

Leave `sync.acronixbooks.com` alone — it already points at the box. DNS can take
up to a few hours to propagate; verify with `dig +short acronixbooks.com`
(expect `147.93.19.105`) before running certbot.

---

## Step 2 — One-time VPS setup (you, as root)

```bash
# Web roots — isolated from every other app on the box
mkdir -p /var/www/acronixbooks.com /var/www/acronix-updates
chown -R www-data:www-data /var/www/acronixbooks.com /var/www/acronix-updates

# nginx site (repo copy is the source of truth: deploy/nginx/acronixbooks.com.conf)
# Copy its contents to the box, then:
ln -sf /etc/nginx/sites-available/acronixbooks.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# TLS — same certbot nginx plugin the sync site uses. Adds the 443 listener,
# the HTTP->HTTPS redirect, and HSTS. Run only AFTER DNS resolves to the box.
certbot --nginx -d acronixbooks.com -d www.acronixbooks.com \
  --non-interactive --agree-tos -m <admin-email> --redirect
```

### The CI deploy key

GitHub Actions needs SSH access to rsync. Create a **dedicated** key (don't
reuse a personal one):

```bash
# On the box (or locally, then copy the public half up):
ssh-keygen -t ed25519 -C "acronix-website-deploy" -f ~/.ssh/acronix_web_deploy -N ""
cat ~/.ssh/acronix_web_deploy.pub >> ~/.ssh/authorized_keys
```

Then in **this repo** → Settings → Secrets and variables → Actions, add:

| Secret | Value |
| ------ | ----- |
| `VPS_HOST` | `147.93.19.105` (or `acronixbooks.com` once DNS is live) |
| `VPS_USER` | `root` (or a dedicated deploy user that owns the web root) |
| `VPS_SSH_KEY` | the **private** half — contents of `~/.ssh/acronix_web_deploy` |

> Prefer a non-root deploy user that owns `/var/www/acronixbooks.com` over
> `root`, matching least-privilege. Root works and matches the box's existing
> convention; tighten later.

---

## Step 3 — Turn the deploy on, then ship

The deploy job is **gated off** until everything above is ready, so merging the
workflow never fires a deploy at an unconfigured box. Flip it on once DNS,
nginx + TLS, and the `VPS_*` secrets are all in place:

- This repo → Settings → Secrets and variables → Actions → **Variables** tab →
  add `DEPLOY_ENABLED` = `true`.

Then either push a change under `client/**` to `master`, or trigger it manually
(Actions → **Deploy** → Run workflow). It builds, rsyncs, and smoke-tests
`https://acronixbooks.com/`.

---

## Smoke test

```bash
curl -sI https://acronixbooks.com/ | head -1            # 200
curl -s https://acronixbooks.com/pricing/ | grep -o '11,999' | head -1
curl -sI https://acronixbooks.com/updates/latest.yml    # 404 until an installer is uploaded — expected
```

A 404 on `latest.yml` is **correct** before any release is uploaded — the
desktop auto-updater fails cleanly on 404, unlike the parked domain's 200+HTML.

---

## The /updates/ feed (separate from this repo)

`site.ts` points the download button and the desktop auto-updater at
`acronixbooks.com/updates/`:

- `AcronixBooks-Setup-latest.exe` — the installer
- `latest.yml` — the electron-updater manifest

These come from the **desktop** release build (`electron-builder`, `publish.url`
= `acronixbooks.com/updates`), not from this website. Upload them into
`/var/www/acronix-updates/`. The site deploy never touches that directory.

---

## Hardening checklist

- [ ] DNS: apex + www → `147.93.19.105`.
- [ ] TLS 1.2+ with HSTS via certbot; HTTP → HTTPS redirect.
- [ ] CI uses a **dedicated** ed25519 deploy key, private half in repo secrets only.
- [ ] Consider a non-root deploy user owning the web root (least privilege).
- [ ] Consider pinning the SSH host key (store `ssh-keyscan` output as a secret)
      instead of the workflow's trust-on-first-use `ssh-keyscan`.
- [ ] Optional: `www` → apex 301 for canonical consistency. The site already
      emits `rel="canonical"` to the non-www URL, so this is a refinement, not a
      correctness fix. Add it only after certbot, and keep the ACME challenge
      path (`/.well-known/acme-challenge/`) served from disk so renewals don't break.
