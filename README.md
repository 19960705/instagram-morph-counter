# Instagram morph counter (Remotion)

Remotion recreation of a 1920x1080, 30fps, ~10.9s screen recording of an Instagram
feed. A colourful blob digit morphs 0→9→0→1→2→3 (~0.78s per digit) inside a post card,
surrounded by a static sidebar, suggestions column and floating messages pill.

- `src/digits.ts` – digit skeletons resampled to equal point counts (for morphing)
- `src/Blob.tsx` – six colour blobs + offset outline drawn along the morphing path
- `src/Instagram.tsx` – page layout, timing and composition

## Run

```bash
npm install
npm start          # Remotion Studio
npm run render     # -> out/instagram.mp4
```
