## Quick context — what this repo is

- Monorepo-style layout: backend (Node/Express + Firebase), content_analyzer (Python), and a Vite React frontend at `frontend/`.
- Frontend uses TypeScript + Vite, Tailwind CSS (v3) and React (see `frontend/package.json`).

## Big picture for an AI code agent

- Primary UI code lives in `frontend/src/` with components under `frontend/src/components/` (common, agreement, pdf, risk, etc.). Example: `frontend/src/components/common/Button.tsx`.
- Backend services are in `backend/src` with controllers and services. If editing API surface, check `backend/src/controllers/*` and `backend/src/services/*`.
- Content analyzer is a separate Python service in `content_analyzer/` (ignore unless working on ML/docs extraction).

## Important developer workflows & commands

- Frontend dev: `cd frontend && npm run dev` (uses Vite). Build: `cd frontend && npm run build` which runs `tsc -b && vite build` per `frontend/package.json`.
- Lint: `cd frontend && npm run lint` (ESLint configured). Tailwind is configured in `frontend/tailwind.config.js` and styles in `frontend/src/index.css`.
- Backend: check `backend/package.json` for server start, Docker, or cloudbuild scripts.

## Project-specific conventions

- Component placement: this repo keeps UI components under `frontend/src/components/<feature>/...` (e.g. `common`, `pdf`, `risk`).
- If you add shadcn-style UI primitives, place them under `frontend/src/components/ui/` (recommended). Many build tools and paths expect components under `src/` so prefer `frontend/src/components/ui` over a root `/components/ui`.
- TypeScript is strict (`frontend/tsconfig.app.json`) — prefer `.tsx` with explicit props interfaces and keep `strict: true` patterns.
- Icons use `lucide-react` (see `frontend/package.json`); follow its import pattern used in existing components.

## Integrating 3D/shader React components (example)

If you add the provided shader components, do the following in this repo:

1. Create the UI folder if missing: `frontend/src/components/ui/` (we recommend this location to stay consistent with existing code).
2. Copy the component files to:
   - `frontend/src/components/ui/background-paper-shaders.tsx`
   - `frontend/src/components/ui/demo.tsx`
3. Install runtime deps inside the frontend package:
   - npm: `cd frontend && npm install three @react-three/fiber`
   - or pnpm: `cd frontend && pnpm add three @react-three/fiber`
4. Tailwind: this repo uses Tailwind v3. Extend `frontend/src/index.css` (already imported by the app). Add any CSS variables or the provided theme block into that file (or update `tailwind.config.js` if you need to add content paths or plugins).

Notes on why `frontend/src/components/ui`:
- Keeps all UI in the `src` tree so Vite/TS resolution stays simple. Existing code imports components with relative paths under `src/` — adding a top-level `/components` could break imports or Vite's content scanning for CSS/Tailwind.

## Example patterns and small rules

- Styling: components use Tailwind utility classes and also some `@layer components` utilities in `frontend/src/index.css` (see `.card`, `.btn`, `.input`). Reuse these utility classes instead of duplicating CSS.
- Type/props: follow existing `.tsx` files that export React components with explicit prop types (see `frontend/src/components/common/Input.tsx`).
- Routing: frontend uses `react-router-dom` (v7) — prefer adding demo pages under `frontend/src/pages` and register routes in the app router.

## Quick checklist when adding a component (for the agent)

1. Confirm TypeScript types and add exported prop interfaces.
2. Place files under `frontend/src/components/ui/` and update any parent route or page to import them (e.g., `import DemoOne from '@/components/ui/demo'`).
3. Install deps in `frontend/` (three, @react-three/fiber) and run dev to catch type/build errors.
4. Add any global CSS variables to `frontend/src/index.css` (Tailwind v3) and restart the dev server.

## Where to look for examples

- UI components & patterns: `frontend/src/components/common/*` and `frontend/src/components/*` feature folders.
- Tailwind setup: `frontend/tailwind.config.js` and `frontend/src/index.css`.
- TS configuration: `frontend/tsconfig.app.json`.

If anything above is unclear or you want me to also add the shader files into `frontend/src/components/ui/` and run the frontend dev to verify, tell me which package manager you prefer (npm / pnpm) and I'll proceed.
