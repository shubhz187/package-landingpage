import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../../theme/constants';

interface AccountBoxProps {
  label: string;
  accountId: string;
  instanceId?: string;
  color: string;
  enterFrame?: number;
  width?: number;
  height?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const AccountBox: React.FC<AccountBoxProps> = ({
  label,
  accountId,
  instanceId,
  color,
  enterFrame = 0,
  width = 350,
  height,
  children,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [20, 0]);

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        width,
        height,
        padding: 20,
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${color}40`,
        borderRadius: 12,
        opacity,
        transform: `translateY(${translateY}px)`,
        position: 'relative',
        ...style,
      }}
    >
      {/* Label badge */}
      <div
        style={{
          position: 'absolute',
          top: -12,
          left: 16,
          padding: '2px 12px',
          background: color,
          borderRadius: 4,
          fontSize: 12,
          fontWeight: 700,
          color: '#000',
          letterSpacing: 1,
        }}
      >
        {label}
      </div>
      {/* Account info */}
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 12, color: COLORS.textDim, fontFamily: "'JetBrains Mono', monospace" }}>
          Account: {accountId}
        </div>
        {instanceId && (
          <div style={{ fontSize: 11, color: COLORS.textDim, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
            Instance: {instanceId.slice(0, 8)}...
          </div>
        )}
      </div>
      {children && <div style={{ marginTop: 12 }}>{children}</div>}
    </div>
  );
};
