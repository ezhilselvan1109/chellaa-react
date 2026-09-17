export const masonryCssText = `
/* ==========================================================================
   Ant Design 6.0 Specification Masonry Styles for Chella UI
   Design Tokens:
   - motionDurationFast: 0.1s
   - motionDurationSlow: 0.3s
   - motionEaseOut: cubic-bezier(0.215, 0.61, 0.355, 1)
   ========================================================================== */

.ch-masonry {
  --ch-motion-duration-fast: 0.1s;
  --ch-motion-duration-slow: 0.3s;
  --ch-motion-ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);

  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.ch-masonry-item {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  transition: transform var(--ch-motion-duration-slow) var(--ch-motion-ease-out),
              opacity var(--ch-motion-duration-slow) var(--ch-motion-ease-out);
  will-change: transform;
}
`;
