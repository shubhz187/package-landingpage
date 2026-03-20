import React from 'react';
import { useCurrentFrame, AbsoluteFill, interpolate } from 'remotion';
import { COLORS } from '../../theme/constants';

export const CircuitBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const dashOffset = interpolate(frame, [0, 600], [0, -200], {
    extrapolateRight: 'extend',
  });

  const lines = [
    { x1: 0, y1: 120, x2: 400, y2: 120, then: { x: 400, y: 300 } },
    { x1: 1920, y1: 200, x2: 1500, y2: 200, then: { x: 1500, y: 450 } },
    { x1: 0, y1: 540, x2: 300, y2: 540, then: { x: 300, y: 700 } },
    { x1: 1920, y1: 680, x2: 1600, y2: 680, then: { x: 1600, y: 900 } },
    { x1: 0, y1: 900, x2: 500, y2: 900, then: { x: 500, y: 1080 } },
    { x1: 1920, y1: 950, x2: 1400, y2: 950, then: { x: 1400, y: 1080 } },
    { x1: 960, y1: 0, x2: 960, y2: 150, then: { x: 1100, y: 150 } },
    { x1: 800, y1: 1080, x2: 800, y2: 850, then: { x: 600, y: 850 } },
  ];

  const dots: Array<{ x: number; y: number }> = [];
  for (let x = 60; x < 1920; x += 60) {
    for (let y = 60; y < 1080; y += 60) {
      dots.push({ x, y });
    }
  }

  return (
    <AbsoluteFill style={{ background: COLORS.bgDeep }}>
      <svg width="1920" height="1080" style={{ position: 'absolute' }}>
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={0.8}
            fill={COLORS.circuit}
          />
        ))}
        {lines.map((line, i) => (
          <g key={`line-${i}`}>
            <path
              d={`M${line.x1},${line.y1} L${line.x2},${line.y2} L${line.then.x},${line.then.y}`}
              stroke={COLORS.circuitLine}
              strokeWidth={1}
              fill="none"
              strokeDasharray="8 12"
              strokeDashoffset={dashOffset}
            />
            <circle
              cx={line.x2}
              cy={line.y2}
              r={3}
              fill={COLORS.circuitLine}
            />
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
