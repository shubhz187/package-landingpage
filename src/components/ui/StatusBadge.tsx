import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING_FAST } from '../../theme/constants';

interface StatusBadgeProps {
  label: string;
  color?: string;
  enterFrame?: number;
  style?: React.CSSProperties;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  color = COLORS.teal,
  enterFrame = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < enterFrame) return null;

  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_FAST,
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: 'inline-block',
        padding: '4px 14px',
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        background: `${color}33`,
        border: `1px solid ${color}66`,
        color,
        transform: `scale(${scale})`,
        opacity,
        fontFamily: "'Inter', sans-serif",
        ...style,
      }}
    >
      {label}
    </div>
  );
};
