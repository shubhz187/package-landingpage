import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS } from '../../theme/constants';

interface TypewriterTextProps {
  text: string;
  startFrame?: number;
  charsPerFrame?: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  showCursor?: boolean;
  style?: React.CSSProperties;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame = 0,
  charsPerFrame = 0.8,
  fontSize = 18,
  color = COLORS.textPrimary,
  fontFamily = "'JetBrains Mono', monospace",
  showCursor = true,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.min(Math.floor(elapsed * charsPerFrame), text.length);
  const displayText = text.slice(0, charsToShow);
  const cursorOpacity = Math.sin(frame * 0.15) > 0 ? 1 : 0;
  const isDone = charsToShow >= text.length;

  return (
    <span
      style={{
        fontSize,
        fontFamily,
        color,
        whiteSpace: 'pre',
        ...style,
      }}
    >
      {displayText}
      {showCursor && (
        <span
          style={{
            opacity: isDone ? cursorOpacity : 1,
            color: COLORS.teal,
          }}
        >
          _
        </span>
      )}
    </span>
  );
};
