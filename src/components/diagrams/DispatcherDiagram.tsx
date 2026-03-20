import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG, SPRING_FAST } from '../../theme/constants';

interface ExtractorInfo {
  label: string;
  output: string;
  color: string;
}

interface DispatcherDiagramProps {
  extractors: ExtractorInfo[];
  enterFrame?: number;
  activationStartFrame?: number; // when arrows start drawing
  staggerFrames?: number; // frames between each arrow (default 15)
  style?: React.CSSProperties;
}

const CENTER_BOX_WIDTH = 260;
const CENTER_BOX_HEIGHT = 56;
const EXTRACTOR_HEIGHT = 36;
const EXTRACTOR_GAP = 10;
const EXTRACTOR_WIDTH = 300;
const ARROW_GAP = 40; // horizontal gap between center box and extractors

export const DispatcherDiagram: React.FC<DispatcherDiagramProps> = ({
  extractors,
  enterFrame = 0,
  activationStartFrame,
  staggerFrames = 15,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const arrowStart = activationStartFrame ?? enterFrame + 20;

  // Spring enter for the center box
  const centerProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const centerOpacity = interpolate(centerProgress, [0, 1], [0, 1]);
  const centerScale = interpolate(centerProgress, [0, 1], [0.85, 1]);

  if (frame < enterFrame) return null;

  const totalExtractorHeight =
    extractors.length * EXTRACTOR_HEIGHT +
    (extractors.length - 1) * EXTRACTOR_GAP;

  // Center of extractors column (relative to container top)
  const containerHeight = Math.max(CENTER_BOX_HEIGHT, totalExtractorHeight);
  const centerBoxTop = (containerHeight - CENTER_BOX_HEIGHT) / 2;
  const extractorsTop = (containerHeight - totalExtractorHeight) / 2;

  const containerWidth = CENTER_BOX_WIDTH + ARROW_GAP + EXTRACTOR_WIDTH + 20;

  return (
    <div
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight,
        ...style,
      }}
    >
      {/* Center dispatcher box */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: centerBoxTop,
          width: CENTER_BOX_WIDTH,
          height: CENTER_BOX_HEIGHT,
          opacity: centerOpacity,
          transform: `scale(${centerScale})`,
          transformOrigin: 'center center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: COLORS.tealDim,
          border: `1px solid ${COLORS.teal}`,
          borderRadius: 10,
          boxShadow: `0 0 16px ${COLORS.tealGlow}`,
          padding: '0 12px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: COLORS.teal,
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.3,
          }}
        >
          SnapshotExtractor
          <br />
          Dispatcher
        </span>
      </div>

      {/* SVG layer for arrows */}
      <svg
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: containerWidth,
          height: containerHeight,
          pointerEvents: 'none',
        }}
      >
        {extractors.map((_, index) => {
          const arrowFrame = arrowStart + index * staggerFrames;

          const drawProgress = interpolate(
            frame,
            [arrowFrame, arrowFrame + 12],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          if (frame < arrowFrame) return null;

          // Arrow start: right edge of center box
          const x1 = CENTER_BOX_WIDTH;
          const y1 = centerBoxTop + CENTER_BOX_HEIGHT / 2;

          // Arrow end: left edge of extractor row
          const extractorMidY =
            extractorsTop +
            index * (EXTRACTOR_HEIGHT + EXTRACTOR_GAP) +
            EXTRACTOR_HEIGHT / 2;
          const x2 = CENTER_BOX_WIDTH + ARROW_GAP;
          const y2 = extractorMidY;

          // Draw the line progressively
          const currX2 = interpolate(drawProgress, [0, 1], [x1, x2]);
          const currY2 = interpolate(drawProgress, [0, 1], [y1, y2]);

          const arrowSize = 6;
          const angle = Math.atan2(y2 - y1, x2 - x1);
          const arrowVisible = drawProgress >= 1;

          return (
            <g key={index}>
              <line
                x1={x1}
                y1={y1}
                x2={currX2}
                y2={currY2}
                stroke={COLORS.teal}
                strokeWidth={1.5}
                opacity={0.7}
              />
              {arrowVisible && (
                <polygon
                  points={`
                    ${x2},${y2}
                    ${x2 - arrowSize * Math.cos(angle - 0.4)},${y2 - arrowSize * Math.sin(angle - 0.4)}
                    ${x2 - arrowSize * Math.cos(angle + 0.4)},${y2 - arrowSize * Math.sin(angle + 0.4)}
                  `}
                  fill={COLORS.teal}
                  opacity={0.7}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Extractor labels */}
      {extractors.map((extractor, index) => {
        const arrowFrame = arrowStart + index * staggerFrames;
        const labelProgress = spring({
          frame: frame - (arrowFrame + 8),
          fps,
          config: SPRING_FAST,
        });

        const labelOpacity = interpolate(labelProgress, [0, 1], [0, 1]);

        if (frame < arrowFrame + 8) return null;

        const topOffset =
          extractorsTop + index * (EXTRACTOR_HEIGHT + EXTRACTOR_GAP);

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: CENTER_BOX_WIDTH + ARROW_GAP + 4,
              top: topOffset,
              width: EXTRACTOR_WIDTH,
              height: EXTRACTOR_HEIGHT,
              opacity: labelOpacity,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 12px',
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${extractor.color}40`,
              borderRadius: 6,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: extractor.color,
                fontFamily: "'JetBrains Mono', monospace",
                whiteSpace: 'nowrap',
              }}
            >
              {extractor.label}
            </span>
            <span
              style={{
                fontSize: 10,
                color: COLORS.textDim,
                fontFamily: "'JetBrains Mono', monospace",
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              ({extractor.output})
            </span>
          </div>
        );
      })}
    </div>
  );
};
