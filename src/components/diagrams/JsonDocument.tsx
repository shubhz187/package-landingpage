import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../../theme/constants';

interface JsonLine {
  text: string;
  highlightFrame?: number; // when this line glows
  highlightColor?: string;
}

interface JsonDocumentProps {
  lines: JsonLine[];
  enterFrame?: number;
  width?: number;
  style?: React.CSSProperties;
}

// Basic JSON syntax colorizer: returns spans for a line of JSON text
const colorizeJsonLine = (
  text: string,
  teal: string,
  amber: string,
  textDim: string,
  textSecondary: string
): React.ReactNode => {
  // Matches: "key": value patterns and standalone brackets/punctuation
  const keyPattern = /^(\s*)("[\w\s\-]+")(\s*:\s*)(.*)/;
  const match = text.match(keyPattern);

  if (match) {
    const [, indent, key, colon, rest] = match;
    const trimmedRest = rest.trim();

    // Determine value color: strings = amber, everything else = textSecondary
    const isString = trimmedRest.startsWith('"');
    const isBracket = ['{', '}', '[', ']', '{,', '},', '],'].includes(
      trimmedRest.replace(/,$/, '').trim()
    );
    const valueColor = isBracket ? textDim : isString ? amber : textSecondary;

    return (
      <>
        <span style={{ color: textDim }}>{indent}</span>
        <span style={{ color: teal }}>{key}</span>
        <span style={{ color: textDim }}>{colon}</span>
        <span style={{ color: valueColor }}>{rest}</span>
      </>
    );
  }

  // Brackets and structural tokens
  const stripped = text.trim();
  if (['{', '}', '[', ']', '{,', '},', '],', '{}', '[]'].includes(stripped)) {
    return <span style={{ color: textDim }}>{text}</span>;
  }

  // Fallback
  return <span style={{ color: textSecondary }}>{text}</span>;
};

export const JsonDocument: React.FC<JsonDocumentProps> = ({
  lines,
  enterFrame = 0,
  width = 500,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring enter for the container
  const enterProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const containerOpacity = interpolate(enterProgress, [0, 1], [0, 1]);
  const containerY = interpolate(enterProgress, [0, 1], [14, 0]);
  const containerScale = interpolate(enterProgress, [0, 1], [0.95, 1]);

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        opacity: containerOpacity,
        transform: `translateY(${containerY}px) scale(${containerScale})`,
        transformOrigin: 'top left',
        width,
        background: 'rgba(10, 10, 26, 0.95)',
        borderRadius: 10,
        overflow: 'hidden',
        border: `1px solid ${COLORS.border}`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        ...style,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          padding: '6px 14px',
          background: 'rgba(255,255,255,0.04)',
          borderBottom: `1px solid ${COLORS.border}`,
          fontSize: 11,
          color: COLORS.textDim,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: 0.5,
        }}
      >
        config.json
      </div>

      {/* Code lines */}
      <div style={{ padding: '10px 0' }}>
        {lines.map((line, index) => {
          const isHighlighted =
            line.highlightFrame !== undefined && frame >= line.highlightFrame;

          const highlightProgress = isHighlighted
            ? interpolate(
                frame,
                [line.highlightFrame!, line.highlightFrame! + 15],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              )
            : 0;

          const highlightBg = isHighlighted
            ? `${line.highlightColor ?? COLORS.teal}${Math.round(highlightProgress * 0.15 * 255)
                .toString(16)
                .padStart(2, '0')}`
            : 'transparent';

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                background: highlightBg,
                borderLeft: isHighlighted
                  ? `3px solid ${line.highlightColor ?? COLORS.teal}`
                  : '3px solid transparent',
                padding: '1px 14px 1px 0',
                minHeight: 20,
              }}
            >
              {/* Line number */}
              <div
                style={{
                  width: 36,
                  flexShrink: 0,
                  textAlign: 'right',
                  paddingRight: 14,
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: COLORS.textDim,
                  userSelect: 'none',
                }}
              >
                {index + 1}
              </div>

              {/* Code content */}
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  lineHeight: 1.6,
                  flex: 1,
                  whiteSpace: 'pre',
                }}
              >
                {colorizeJsonLine(
                  line.text,
                  COLORS.teal,
                  COLORS.amber,
                  COLORS.textDim,
                  COLORS.textSecondary
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
