import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../theme/constants';

interface ProgressBarProps {
  startFrame: number;
  duration: number;
  width?: number;
  height?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  startFrame,
  duration,
  width = 400,
  height = 6,
  color = COLORS.teal,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + duration], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        height,
        background: 'rgba(255,255,255,0.06)',
        borderRadius: height / 2,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color}, ${COLORS.amber})`,
          borderRadius: height / 2,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  );
};
