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

## First-time setup

Requires Python 3 and Node (with `yarn`).

```bash
# 1. Backend deps + database
make install      # creates venv, installs requirements
make migrate      # builds the SQLite database
make superuser    # create your login (email + password)

# 2. Frontend deps are installed automatically by `make gui`
```

## Running day-to-day

Two terminals:

```bash
make server       # backend  -> http://localhost:8000
make gui          # frontend -> http://localhost:3000
```

Open http://localhost:3000 and log in with the account you created.

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
