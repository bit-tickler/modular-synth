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

1. In the **root** directory, install everything
```bash
pnpm install
```

2. In the **root** directory, start the containerised local development [PostGresQL](https://www.postgresql.org/) database with [Docker](https://www.docker.com/) ([Docker Compose](https://docs.docker.com/compose/))
```bash
docker compose up -d
```

3.  The backend server uses the ORM [Prisma](https://www.prisma.io/)  and an environment variable `DATABASE_URL` to connect to the local development database.

    Create the file `/apps/server/.env` and add the environment variable: 
    `DATABASE_URL="postgresql://dev_user:dev_password@localhost:5433/dev_db_modular_synth?schema=public"`

    Ensure that the DATABASE_URL corresponds with the environment variables in `./docker-compose.yml`: 
    - POSTGRES_USER
    - POSTGRES_PASSWORD
    - POSTGRES_DB
    - ports 

3. In the `apps/server` directory, run the Prisma setup once
```bash
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

## Available Scripts

### From root directory

- Build everything:
```bash
pnpm turbo run build
```

- Run UI + server in watch mode (recommended)
```bash
pnpm turbo run dev
```

- Run Prisma Studio Web bases GUI
```bash
pnpm prisma studio
```

### From `apps/server` directory:

- Generate both the **server** AND **ui** Prisma clients:
```bash
pnpm prisma:generate
```
*Note: @prisma/client is installed in both the **server** AND **ui** directories, this is to enable the TS types generated within the Prisma client to be accessible in the frontend ui, improving type consistency across the codebase.*


Authentication (already working)

`POST /auth/signup` → creates user + sets session cookie

`POST /auth/login`  → logs in + sets session cookie

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
