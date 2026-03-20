import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../theme/constants';

interface ParticleBurstProps {
  triggerFrame: number;
  x: number;
  y: number;
  count?: number;
  colors?: string[];
}

export const ParticleBurst: React.FC<ParticleBurstProps> = ({
  triggerFrame,
  x,
  y,
  count = 20,
  colors = [COLORS.teal, COLORS.green, COLORS.tealLight],
}) => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5,
      speed: 3 + Math.random() * 5,
      size: 3 + Math.random() * 4,
      color: colors[i % colors.length],
      gravity: 0.08 + Math.random() * 0.04,
    }));
  }, [count, colors]);

  if (frame < triggerFrame) return null;

  const elapsed = frame - triggerFrame;
  if (elapsed > 60) return null;

  return (
    <>
      {particles.map((p, i) => {
        const px = x + Math.cos(p.angle) * p.speed * elapsed;
        const py =
          y +
          Math.sin(p.angle) * p.speed * elapsed +
          p.gravity * elapsed * elapsed;
        const opacity = interpolate(elapsed, [0, 40, 60], [1, 0.6, 0], {
          extrapolateRight: 'clamp',
        });
        const scale = interpolate(elapsed, [0, 60], [1, 0.3], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: px,
              top: py,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              opacity,
              transform: `scale(${scale})`,
              boxShadow: `0 0 6px ${p.color}`,
            }}
          />
        );
      })}
    </>
  );
};
