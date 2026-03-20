import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../theme/constants';

interface CheckmarkProps {
  triggerFrame: number;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const Checkmark: React.FC<CheckmarkProps> = ({
  triggerFrame,
  size = 24,
  color = COLORS.green,
  style = {},
}) => {
  const frame = useCurrentFrame();
  if (frame < triggerFrame) return null;

  const elapsed = frame - triggerFrame;
  const dashOffset = interpolate(elapsed, [0, 15], [30, 0], {
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(elapsed, [0, 8, 15], [0.5, 1.2, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: `scale(${scale})`, ...style }}
    >
      <path
        d="M5 13l4 4L19 7"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={30}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
};
