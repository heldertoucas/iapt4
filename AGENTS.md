# Developer Guidelines for the Codex Agent

This repository contains the **IA para Todos** React single-page application.
Follow these instructions when modifying the project with ChatGPT Codex.

## Setup
- Run `./scripts/setup_codex_environment.sh` in the repository root to install system packages (such as `tree`) and project dependencies.
- If the script cannot run, at minimum run `npm install` before building.

## Build Verification
- After making any code changes, run `npm run build` to ensure the project compiles successfully.
- Include the build result in the PR Testing section.

## Coding Standards
- Use **TypeScript** and **React** (`.tsx` files) for components.
- Keep reusable UI elements in `components/ui`, layouts in `components/layout`, and larger sections in the appropriate folders as described in `docs/COMPONENT_LIBRARY.md`.
- Do not commit secrets or `.env.local`.

## Documentation
- Update relevant docs when adding new major components or features.
- Reference `docs/COMPONENT_LIBRARY.md` to document any new reusable component.


