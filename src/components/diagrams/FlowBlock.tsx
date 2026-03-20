import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../theme/constants';
import { ServiceIcon } from './ServiceIcon';

interface FlowBlockProps {
  label: string;
  icon: string;
  color?: string;
  triggerFrame?: number;
  glowDuration?: number;
  enterFrame?: number;
  style?: React.CSSProperties;
}

export const FlowBlock: React.FC<FlowBlockProps> = ({
  label,
  icon,
  color = COLORS.teal,
  triggerFrame,
  glowDuration = 30,
  enterFrame = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [enterFrame, enterFrame + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isGlowing =
    triggerFrame !== undefined &&
    frame >= triggerFrame &&
    frame < triggerFrame + glowDuration;

  const glowIntensity = isGlowing
    ? interpolate(
        frame,
        [triggerFrame!, triggerFrame! + 10, triggerFrame! + glowDuration],
        [0, 1, 0.4],
        { extrapolateRight: 'clamp' }
      )
    : 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 16px',
        background: isGlowing
          ? `rgba(0, 212, 170, ${0.05 + glowIntensity * 0.1})`
          : COLORS.bgCard,
        border: `1px solid ${isGlowing ? color : COLORS.border}`,
        borderRadius: 8,
        opacity,
        boxShadow: isGlowing ? `0 0 ${20 * glowIntensity}px ${color}` : 'none',
        transition: 'background 0.1s',
        ...style,
      }}
    >
      <ServiceIcon type={icon} size={20} />
      <span style={{ fontSize: 14, color: isGlowing ? color : COLORS.textPrimary, fontWeight: 500 }}>
        {label}
      </span>
    </div>
  );
};
