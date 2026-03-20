import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_FAST } from '../../theme/constants';

interface DynamoDBRowProps {
  fields: { key: string; value: string; highlight?: boolean }[];
  enterFrame?: number;
  style?: React.CSSProperties;
}

export const DynamoDBRow: React.FC<DynamoDBRowProps> = ({
  fields,
  enterFrame = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_FAST,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [-30, 0]);

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap: 1,
        opacity,
        transform: `translateX(${translateX}px)`,
        ...style,
      }}
    >
      {fields.map((field, i) => (
        <div
          key={i}
          style={{
            padding: '6px 12px',
            background: field.highlight ? COLORS.tealDim : 'rgba(255,255,255,0.03)',
            border: `1px solid ${field.highlight ? COLORS.borderTeal : COLORS.border}`,
            borderRadius: 4,
            flex: 1,
          }}
        >
          <div style={{ fontSize: 9, color: COLORS.textDim, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {field.key}
          </div>
          <div
            style={{
              fontSize: 12,
              color: field.highlight ? COLORS.teal : COLORS.textPrimary,
              fontFamily: "'JetBrains Mono', monospace",
              marginTop: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {field.value}
          </div>
        </div>
      ))}
    </div>
  );
};
