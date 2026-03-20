import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../../theme/constants';
import { TypewriterText } from './TypewriterText';

interface TerminalLine {
  text: string;
  delay: number;
  color?: string;
  prefix?: string;
}

interface TerminalBlockProps {
  lines: TerminalLine[];
  enterFrame?: number;
  width?: number | string;
  title?: string;
  style?: React.CSSProperties;
}

export const TerminalBlock: React.FC<TerminalBlockProps> = ({
  lines,
  enterFrame = 0,
  width = 800,
  title = 'terminal',
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
  const scale = interpolate(progress, [0, 1], [0.95, 1]);

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        width,
        background: 'rgba(10, 10, 26, 0.95)',
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        overflow: 'hidden',
        transform: `scale(${scale})`,
        opacity,
        boxShadow: `0 0 40px rgba(0,0,0,0.5)`,
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 16px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
        <span style={{ marginLeft: 12, fontSize: 12, color: COLORS.textDim, fontFamily: "'Inter', sans-serif" }}>
          {title}
        </span>
      </div>
      {/* Content */}
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ display: 'flex', lineHeight: 1.7 }}>
            {line.prefix !== undefined ? (
              <span style={{ color: COLORS.green, fontFamily: "'JetBrains Mono', monospace", fontSize: 16, marginRight: 8 }}>
                {line.prefix}
              </span>
            ) : (
              <span style={{ color: COLORS.green, fontFamily: "'JetBrains Mono', monospace", fontSize: 16, marginRight: 8 }}>
                $
              </span>
            )}
            <TypewriterText
              text={line.text}
              startFrame={enterFrame + line.delay}
              fontSize={16}
              color={line.color || COLORS.textPrimary}
              showCursor={i === lines.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
