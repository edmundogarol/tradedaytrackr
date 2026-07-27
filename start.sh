#!/usr/bin/env bash
# Start TradeDayTrackR: backend + frontend together. Ctrl-C stops both.
set -e
cd "$(dirname "$0")"

if [ ! -d venv ]; then
  echo "No venv found. Run:  make setup   first."
  exit 1
fi

source venv/bin/activate

echo "→ Applying database migrations..."
python manage.py migrate --noinput

echo "→ Starting backend on http://localhost:8000"
python manage.py runserver 0.0.0.0:8000 &
BACKEND_PID=$!

# Kill the backend when this script exits (e.g. you press Ctrl-C).
trap "kill $BACKEND_PID 2>/dev/null" EXIT

echo "→ Starting frontend on http://localhost:3000"
echo ""
echo "   Open http://localhost:3000 in your browser."
echo "   Press Ctrl-C here to stop everything."
echo ""
cd frontend
yarn install --silent
yarn run watchdev
