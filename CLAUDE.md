# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Animated explainer video for "Package Deploy Connect" (PDC) — an AWS Connect deployment tool. Built with **Remotion** (React-based programmatic video framework), rendering a 1920×1080 video at 30fps, 7500 frames (~4m10s).

## Commands

- `npm run dev` — Open Remotion Studio for live preview
- `npm run render` — Render full video to `out/pdc-video.mp4`
- `npm run lint` — Run ESLint + TypeScript type checking (`eslint src && tsc`)
- `npm run build` — Bundle for deployment

To render a single scene for fast iteration, use the composition IDs registered in `Root.tsx`:
```
npx remotion render Scene01-ColdOpen out/scene01.mp4
```

## Architecture

**Entry point:** `src/index.ts` → registers `Root.tsx` which defines all Remotion `<Composition>` entries.

**Main composition:** `src/PackageDeployConnect.tsx` — sequences all 9 scenes using `<Sequence>` with frame offsets from `theme/constants.ts`. A persistent `CircuitBackground` renders behind all scenes.

**Scene timing & constants:** `src/theme/constants.ts` — single source of truth for frame counts, colors, spring configs, AWS resource definitions, and account metadata. Scene start/duration are defined in `SCENES` and must stay contiguous (each scene's `start` = previous scene's `start + duration`).

### Source layout

- `src/scenes/Scene01-09_*.tsx` — Each scene is a self-contained component using `useCurrentFrame()` for animation. Scenes are individually previewable via their own `<Composition>` in `Root.tsx`.
- `src/components/ui/` — Reusable animated primitives (GlassCard, TypewriterText, TerminalBlock, ProgressBar, Checkmark, ParticleBurst, StatusBadge)
- `src/components/backgrounds/` — CircuitBackground (SVG grid + animated lines), GlowOrb
- `src/components/diagrams/` — Domain-specific visuals for AWS architecture (ServiceIcon, AccountBox, ArnLabel, ArrowConnector, FlowBlock, S3Bucket, DynamoDBRow, etc.)
- `public/icons/` — SVG icons for AWS services (lambda, lex, s3, dynamodb, etc.)
- `public/fonts/` — Inter variable font
- `landing/` — Standalone HTML landing page (separate from the video project)

## Key Patterns

- Animations use Remotion's `interpolate()` and `spring()` with frame math — all timing is frame-based, not time-based.
- Two shared spring configs exist: `SPRING_CONFIG` (standard) and `SPRING_FAST` (snappy). Use these for consistency.
- Styling uses Tailwind CSS v4 (integrated via `@remotion/tailwind-v4` webpack override in `remotion.config.ts`) alongside inline styles.
- The video uses a dark theme with teal (#00D4AA) as the primary accent color. All colors are defined in `COLORS`.
- Static assets are referenced from `public/` using `/public/` paths (Remotion's static file serving).
- `remotion.config.ts` sets JPEG output format, overwrite-on-render, and SwANGLE GL renderer.
