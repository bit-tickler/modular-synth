# Modular Synth – Faust + SvelteKit + NestJS

A browser-based node-based modular synth with dynamic Faust DSP, real-time audio, and user accounts + patch sharing.

## Project Structure
```bash
modular-synth/
├── packages/audio-engine/   ← FaustWasm + AudioGraphManager (shared TS library)
├── apps/ui/                 ← SvelteKit frontend (Svelte Flow editor coming soon)
├── apps/server/             ← NestJS backend (auth + patch storage)
├── docker-compose.yml       ← PostgreSQL dev DB
├── pnpm-workspace.yaml
└── turbo.json
```

## Install everything

1. Install everything
```bash
cd modular-synth
pnpm install
```

2. Start the Database (Docker)
```bash
docker compose up -d
```
(Uses port 5432. Change to 5433 in docker-compose.yml if you have a conflict.)

3. Prisma setup (run once)
```bash
cd apps/server
npx prisma generate
npx prisma db push
```

4. Start everything
In separate terminals:

Terminal 1 – Backend (NestJS + auth + patches)
```bash
cd apps/server
pnpm run start:dev
```

Terminal 2 – Frontend (SvelteKit)
```bash
cd apps/ui
pnpm run dev
```
Open → http://localhost:5173

Available Scripts (from project root)
```bash
pnpm turbo run build        # Build everything
pnpm turbo run dev          # Run UI + server in watch mode (recommended)
pnpm prisma studio          # Run Prisma Studio GUI
```

Authentication (already working)
POST /auth/signup → creates user + sets session cookie
POST /auth/login  → logs in + sets session cookie

Example:
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo123"}'
```
## Patch Storage (coming next)
Patches are stored in the Patch table with data: Json (full Svelte Flow graph + Faust code).
Only the owner can edit their patches (we’ll add protection soon).
Useful Commands
```bash
docker compose down -v      # Reset database to clean slate
npx prisma studio           # GUI for your DB
pnpm turbo run build        # Type-check + build everything
```

## Tech Stack
- Audio Engine: FaustWasm + AudioWorklet (dynamic compilation)
- Frontend: SvelteKit + Svelte Flow (node editor)
- Backend: NestJS + Prisma 5 + Lucia v3 (auth)
- Database: PostgreSQL (Docker)
