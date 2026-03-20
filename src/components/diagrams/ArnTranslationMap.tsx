import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../../theme/constants';

interface ArnMapEntry {
  sourceArn: string;
  targetArn: string;
  label: string;
  color: string;
  enterFrame: number;
}

interface ArnTranslationMapProps {
  entries: ArnMapEntry[];
  enterFrame?: number;
  style?: React.CSSProperties;
}

// Extract key parts from an ARN for truncated display
const truncateArn = (arn: string): string => {
  const parts = arn.split(':');
  if (parts.length < 6) return arn;
  // Show: service:region:accountId:resource (last part)
  const service = parts[2] ?? '';
  const region = parts[3] ?? '';
  const accountId = parts[4] ?? '';
  const resource = parts.slice(5).join(':').split('/').pop() ?? parts[5] ?? '';
  return `${service}:${region}:${accountId}:…/${resource}`;
};

export const ArnTranslationMap: React.FC<ArnTranslationMapProps> = ({
  entries,
  enterFrame = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring enter for container
  const containerProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const containerOpacity = interpolate(containerProgress, [0, 1], [0, 1]);
  const containerY = interpolate(containerProgress, [0, 1], [16, 0]);

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        opacity: containerOpacity,
        transform: `translateY(${containerY}px)`,
        border: `1px solid ${COLORS.borderTeal}`,
        borderRadius: 12,
        padding: 16,
        background: COLORS.bgCard,
        ...style,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: COLORS.teal,
          marginBottom: 12,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        ARN Translation Map
      </div>

      {/* Entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {entries.map((entry, index) => {
          const entryProgress = interpolate(
            frame,
            [entry.enterFrame, entry.enterFrame + 15],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          const entryOpacity = entryProgress;
          const entryX = interpolate(entryProgress, [0, 1], [-20, 0]);

          if (frame < entry.enterFrame) return null;

          return (
            <div
              key={index}
              style={{
                opacity: entryOpacity,
                transform: `translateX(${entryX}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 6,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              {/* Label badge */}
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: '#000',
                  background: entry.color,
                  borderRadius: 3,
                  padding: '2px 6px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                {entry.label}
              </div>

              {/* Source ARN */}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: COLORS.textSecondary,
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {truncateArn(entry.sourceArn)}
              </span>

              {/* Arrow */}
              <span
                style={{
                  fontSize: 12,
                  color: COLORS.teal,
                  flexShrink: 0,
                }}
              >
                →
              </span>

              {/* Target ARN */}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: COLORS.textPrimary,
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {truncateArn(entry.targetArn)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
