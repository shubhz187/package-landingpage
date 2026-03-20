import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface GlowOrbProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  speed?: number;
}

export const GlowOrb: React.FC<GlowOrbProps> = ({
  x,
  y,
  size = 300,
  color = 'rgba(0, 212, 170, 0.04)',
  speed = 0.3,
}) => {
  const frame = useCurrentFrame();
  const offsetX = interpolate(
    Math.sin(frame * speed * 0.01),
    [-1, 1],
    [-40, 40]
  );
  const offsetY = interpolate(
    Math.cos(frame * speed * 0.013),
    [-1, 1],
    [-30, 30]
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x + offsetX,
        top: y + offsetY,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }}
    />
  );
};
