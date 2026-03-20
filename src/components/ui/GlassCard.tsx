import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../../theme/constants';

interface GlassCardProps {
  children: React.ReactNode;
  enterFrame?: number;
  width?: number | string;
  height?: number | string;
  padding?: number;
  glowColor?: string;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  enterFrame = 0,
  width = 'auto',
  height = 'auto',
  padding = 32,
  glowColor = COLORS.tealGlow,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const scale = interpolate(progress, [0, 1], [0.9, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        width,
        height,
        padding,
        background: COLORS.bgCard,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        boxShadow: `0 0 30px ${glowColor}, inset 0 0 30px rgba(0,0,0,0.2)`,
        transform: `scale(${scale})`,
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
