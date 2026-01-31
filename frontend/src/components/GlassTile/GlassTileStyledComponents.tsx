import styled from "styled-components";

export const GlassTileContainer = styled.div<{
  $leftAlign?: boolean;
  $minHeight?: number;
  $minWidth?: number;
  $padding?: number;
}>`
  height: 100%;
  display: flex;
  align-items: ${(props): string =>
    props.$leftAlign ? "flex-start" : "center"};
  justify-content: center;
  flex-direction: column;
  min-width: ${(props): number => props.$minWidth ?? 150}px;
  position: relative;
  padding: ${(props): number => props.$padding ?? 12}px;
  box-shadow: 1px 13px 30px #00000047;
  min-height: ${(props): number => props.$minHeight ?? 112}px;
  pointer-events: none;

  width: 100%;
  /* ✅ HOVER THE REAL ELEMENT */
  &:hover::before {
    content: "";
    position: absolute;
    inset: 0;

    background-image: radial-gradient(
        60% 100% at 50% 0%,
        rgb(255 236 80) 0%,
        rgb(255 234 47 / 40%) 35%,
        rgb(80 255 121 / 24%) 55%,
        transparent 75%
      ),
      radial-gradient(
        60% 100% at 50% 100%,
        rgba(80, 255, 120, 0.85) 0%,
        rgba(80, 255, 120, 0.5) 35%,
        rgba(80, 255, 120, 0.2) 55%,
        transparent 75%
      );

    background-repeat: no-repeat;
    background-size: 100% 4%;
    background-position: top center, bottom center;

    filter: blur(0.5px);
    opacity: 0.95;

    transform: translateX(-10px);

    transition: background-image 200ms ease, opacity 200ms ease;
    pointer-events: none;
  }
`;

export const GlassTileBoxGlow = styled.div<{
  $positive?: boolean;
  $featureTile?: boolean;
}>`
  position: absolute;
  height: 100%;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    inset: 0;

    ${(props): string =>
      props.$positive
        ? `
        background-image:
          radial-gradient(
            60% 100% at 50% 0%,
            rgba(80, 255, 121, 0) 0%,
            rgba(80, 255, 121, 0) 35%,
            rgba(80, 255, 121, 0) 55%,
            transparent 75%
          ),
          radial-gradient(
            60% 100% at 50% 100%,
            rgba(80, 255, 120, 0.85) 0%,
            rgba(80, 255, 120, 0.5) 35%,
            rgba(80, 255, 120, 0.2) 55%,
            transparent 75%
          );
        `
        : `
        background-image:
          radial-gradient(
            60% 100% at 50% 0%,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 100, 100, 0) 35%,
            rgba(255, 100, 100, 0) 55%,
            transparent 75%
          ),
          radial-gradient(
            60% 100% at 50% 100%,
            rgba(255, 100, 100, 0.85) 0%,
            rgba(255, 100, 100, 0.5) 35%,
            rgba(255, 100, 100, 0.2) 55%,
            transparent 75%
          );
        `}

    background-repeat: no-repeat;
    background-size: 100% ${(props): number => (props.$featureTile ? 9 : 4)}%;
    background-position: top center, bottom center;

    filter: blur(${(props): number => (props.$featureTile ? 1.5 : 0.5)}px);
    opacity: 0.95;

    transform: translateX(-10px);

    transition: background-image 200ms ease, opacity 200ms ease;
  }
`;

export const GlassTileShine = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  box-shadow: inset 4px 5px 7px -1px rgba(255, 255, 255, 0.1),
    inset -1px -1px 1px 1px rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  background: #6060601c;
`;

export const GlassTileEffect = styled.div`
  position: absolute;
  z-index: 0;
  inset: 0;
  backdrop-filter: blur(2px);
  overflow: hidden;
  isolation: isolate;
`;

export const GlowingIconWrapper = styled.div<{
  $positive?: boolean;
  $size?: number;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ $size }): number => $size ?? 40}px;
  height: ${({ $size }): number => $size ?? 40}px;

  svg {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: "";
    position: absolute;
    inset: -40%;
    border-radius: 50%;

    background: ${({ $positive }): string =>
      $positive
        ? `
          radial-gradient(
            circle at center,
            rgba(80, 255, 120, 0.8) 0%,
            rgba(80, 255, 120, 0.35) 35%,
            rgba(80, 255, 120, 0.15) 55%,
            transparent 70%
          )
        `
        : `
          radial-gradient(
            circle at center,
            rgba(255, 100, 100, 0.8) 0%,
            rgba(255, 100, 100, 0.35) 35%,
            rgba(255, 100, 100, 0.15) 55%,
            transparent 70%
          )
        `};

    filter: blur(17px);
    opacity: 0.8;
    pointer-events: none;
    transition: opacity 200ms ease;
    transform: scale(0.4);
  }

  &:hover::before {
    opacity: 1;
  }
`;
