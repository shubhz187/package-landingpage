import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../../theme/constants';

interface PostRequestArrowProps {
  fromLabel: string;
  toLabel: string;
  method?: string; // default "POST"
  path?: string; // default "/connect/map"
  enterFrame?: number;
  flyDuration?: number; // default 30
  style?: React.CSSProperties;
}

const BOX_WIDTH = 130;
const BOX_HEIGHT = 48;
const ARROW_AREA_WIDTH = 200;
const PILL_HEIGHT = 22;

export const PostRequestArrow: React.FC<PostRequestArrowProps> = ({
  fromLabel,
  toLabel,
  method = 'POST',
  path = '/connect/map',
  enterFrame = 0,
  flyDuration = 30,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring enter for the whole component
  const enterProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const containerOpacity = interpolate(enterProgress, [0, 1], [0, 1]);
  const containerY = interpolate(enterProgress, [0, 1], [12, 0]);

  // Flying pill: starts at enterFrame, travels over flyDuration frames
  const flyProgress =
    frame >= enterFrame
      ? interpolate(
          frame,
          [enterFrame, enterFrame + flyDuration],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
      : 0;

  // Pill position along arrow (left edge of arrow area → right edge)
  const pillX = interpolate(flyProgress, [0, 1], [0, ARROW_AREA_WIDTH - 80]);

  // Pill only visible while in flight (0 < flyProgress < 1)
  const pillOpacity =
    flyProgress > 0 && flyProgress < 1
      ? 1
      : flyProgress >= 1
        ? interpolate(flyProgress, [0.9, 1], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
        : 0;

  const totalWidth = BOX_WIDTH + ARROW_AREA_WIDTH + BOX_WIDTH;

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        opacity: containerOpacity,
        transform: `translateY(${containerY}px)`,
        display: 'flex',
        alignItems: 'center',
        width: totalWidth,
        ...style,
      }}
    >
      {/* FROM box */}
      <div
        style={{
          width: BOX_WIDTH,
          height: BOX_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "'Inter', sans-serif",
            textAlign: 'center',
            padding: '0 8px',
          }}
        >
          {fromLabel}
        </span>
      </div>

      {/* Arrow area with flying pill */}
      <div
        style={{
          width: ARROW_AREA_WIDTH,
          height: BOX_HEIGHT,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Dashed horizontal line */}
        <svg
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: ARROW_AREA_WIDTH,
            height: BOX_HEIGHT,
            pointerEvents: 'none',
          }}
        >
          <line
            x1={0}
            y1={BOX_HEIGHT / 2}
            x2={ARROW_AREA_WIDTH - 10}
            y2={BOX_HEIGHT / 2}
            stroke={COLORS.border}
            strokeWidth={1.5}
            strokeDasharray="6 4"
          />
          {/* Arrowhead */}
          <polygon
            points={`${ARROW_AREA_WIDTH - 10},${BOX_HEIGHT / 2 - 5} ${ARROW_AREA_WIDTH},${BOX_HEIGHT / 2} ${ARROW_AREA_WIDTH - 10},${BOX_HEIGHT / 2 + 5}`}
            fill={COLORS.border}
          />
        </svg>

        {/* Flying pill */}
        {flyProgress > 0 && (
          <div
            style={{
              position: 'absolute',
              left: pillX,
              top: BOX_HEIGHT / 2 - PILL_HEIGHT / 2,
              height: PILL_HEIGHT,
              padding: '0 8px',
              background: COLORS.teal,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              opacity: pillOpacity,
              whiteSpace: 'nowrap',
              boxShadow: `0 0 10px ${COLORS.tealGlow}`,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#000',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {method}
            </span>
            <span
              style={{
                fontSize: 10,
                color: 'rgba(0,0,0,0.75)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {path}
            </span>
          </div>
        )}
      </div>

      {/* TO box */}
      <div
        style={{
          width: BOX_WIDTH,
          height: BOX_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "'Inter', sans-serif",
            textAlign: 'center',
            padding: '0 8px',
          }}
        >
          {toLabel}
        </span>
      </div>
    </div>
  );
};
