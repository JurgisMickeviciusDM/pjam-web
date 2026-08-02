#!/bin/sh
set -e

echo "→ Applying database migrations..."
if [ -d "prisma/migrations" ]; then
  npx prisma migrate deploy
else
  # No migration history committed — sync the schema directly.
  npx prisma db push --skip-generate
fi

if [ "${SEED_ON_START:-false}" = "true" ]; then
  echo "→ Seeding database..."
  npx prisma db seed || echo "  (seed skipped or already applied)"
fi

echo "→ Starting server..."
exec "$@"
