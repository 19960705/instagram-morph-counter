# Instagram morph counter (Remotion)

Remotion recreation of the animated part of a ~10.9s Instagram clip: a colourful
blob digit morphing 0→9→0→1→2→3 (~0.78s per digit), 1080x1350 @30fps. Only the
animation is recreated, not the surrounding Instagram UI.

- `src/digits.ts` – digit skeletons resampled to equal point counts (for morphing)
- `src/Blob.tsx` – six colour blobs + offset outline drawn along the morphing path
- `src/Instagram.tsx` – composition and timing

## Run

```bash
npm install
npm start          # Remotion Studio
npm run render     # -> out/instagram.mp4
```
