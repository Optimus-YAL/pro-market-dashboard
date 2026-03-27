# Project Brain
## Claude Code Instructions

.claude/
├── agents/       ← Your AI team members
├── commands/     ← Custom slash commands
├── hooks/        ← Rules Claude MUST follow
├── rules/        ← Context-aware instructions
├── skills/       ← Situational intelligence
└── settings.json ← The control center
CLAUDE.md         ← The project brain (root)

## Stack
Next.js 14, Tailwind + shadcn/ui, Supabase, Stripe, Vercel

## Commands
npm run dev | npm run build | npm test | npm run lint

## Conventions
- TypeScript strict, no `any`
- Zustand for state
- Dark mode first
- Auto-commit after every change
