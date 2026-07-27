# TradeDayTrackR

A personal, local-only trading journal and analytics app. Track trades, manage
prop-firm-style accounts, journal entries, and analyze performance over time.

This is a **single-user, run-on-your-own-machine** build — no accounts to pay for,
no cloud, no recurring cost. Data lives in a local SQLite file and screenshots
live on local disk.

---

## Tech stack

- **Backend:** Django + Django REST Framework, SQLite
- **Frontend:** React (TypeScript), Webpack, Material UI
- **Auth:** Django session auth (one local account you create)

---

## Quick start

Needs **Python 3** and **Node** (with `yarn`) installed.

**First time only** — installs everything, then asks you to create your login:

```bash
make setup
```

(When it prompts, enter the email + password you want to log in with.)

**Every time you want to use the app:**

```bash
make start
```

Then open **http://localhost:3000** and log in. Press **Ctrl-C** in the terminal to stop.

That's it.

---

## Useful commands

| Command | What it does |
|---|---|
| `make server` | Run the Django API (localhost:8000) |
| `make gui` | Run the React dev server (localhost:3000) |
| `make migrate` | Apply database migrations |
| `make makemigrations` | Generate migrations after model changes |
| `make superuser` | Create/add a login account |
| `make testbe` | Run backend tests |
| `make lint` | Lint the frontend |
| `make cleanmedia` | Remove orphaned uploaded images |
| `make resetdb` | Wipe DB + migrations and rebuild from scratch |

## Backup

Everything you care about is two things — copy them anywhere to back up:

- `db.sqlite3` — all trades, accounts, journal entries
- `media/` — uploaded trade screenshots

## Reset password

No email is configured (local app). Reset a password via:

```bash
. venv/bin/activate && python manage.py changepassword <your-email>
```

or through the Django admin at http://localhost:8000/admin/.
