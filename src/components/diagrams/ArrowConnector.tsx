import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../theme/constants';

interface ArrowConnectorProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  drawFrame?: number;
  drawDuration?: number;
  color?: string;
  dashed?: boolean;
}

export const ArrowConnector: React.FC<ArrowConnectorProps> = ({
  x1,
  y1,
  x2,
  y2,
  drawFrame = 0,
  drawDuration = 20,
  color = COLORS.teal,
  dashed = false,
}) => {
  const frame = useCurrentFrame();
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const dashOffset = interpolate(
    frame,
    [drawFrame, drawFrame + drawDuration],
    [length, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const opacity = frame >= drawFrame ? 1 : 0;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const arrowSize = 8;

  return (
    <svg
      style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={1.5}
        strokeDasharray={dashed ? '6 4' : length}
        strokeDashoffset={dashed ? 0 : dashOffset}
      />
      {dashOffset <= 0 && (
        <polygon
          points={`
            ${x2},${y2}
            ${x2 - arrowSize * Math.cos(angle - 0.4)},${y2 - arrowSize * Math.sin(angle - 0.4)}
            ${x2 - arrowSize * Math.cos(angle + 0.4)},${y2 - arrowSize * Math.sin(angle + 0.4)}
          `}
          fill={color}
        />
      )}
    </svg>
  );
};
