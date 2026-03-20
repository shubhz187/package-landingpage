import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../theme/constants';

interface ArnLabelProps {
  arn: string;
  morphTo?: string;
  morphStartFrame?: number;
  morphDuration?: number;
  highlightAccountId?: boolean;
  enterFrame?: number;
  fontSize?: number;
  style?: React.CSSProperties;
}

export const ArnLabel: React.FC<ArnLabelProps> = ({
  arn,
  morphTo,
  morphStartFrame = 0,
  morphDuration = 60,
  highlightAccountId = true,
  enterFrame = 0,
  fontSize = 13,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [enterFrame, enterFrame + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (frame < enterFrame) return null;

  // Determine displayed text
  let displayArn = arn;
  let morphProgress = 0;

  if (morphTo && frame >= morphStartFrame) {
    morphProgress = interpolate(
      frame,
      [morphStartFrame, morphStartFrame + morphDuration],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    // Character-by-character morph
    const maxLen = Math.max(arn.length, morphTo.length);
    const charsToMorph = Math.floor(morphProgress * maxLen);
    const chars: string[] = [];

    for (let i = 0; i < maxLen; i++) {
      if (i < charsToMorph) {
        chars.push(morphTo[i] || '');
      } else {
        chars.push(arn[i] || '');
      }
    }
    displayArn = chars.join('');
  }

  // Parse ARN parts to highlight account ID
  const arnParts = displayArn.split(':');
  const accountIdIndex = 4; // arn:aws:service:region:ACCOUNT_ID:...

  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize,
        opacity,
        display: 'inline-flex',
        background: 'rgba(0,0,0,0.4)',
        padding: '4px 10px',
        borderRadius: 4,
        border: `1px solid ${morphProgress > 0 && morphProgress < 1 ? COLORS.teal : COLORS.border}`,
        boxShadow: morphProgress > 0 && morphProgress < 1 ? `0 0 12px ${COLORS.tealGlow}` : 'none',
        ...style,
      }}
    >
      {arnParts.map((part, i) => {
        const isAccountId = i === accountIdIndex && highlightAccountId;
        const originalParts = arn.split(':');
        const changed = morphTo && part !== originalParts[i];

        return (
          <React.Fragment key={i}>
            <span
              style={{
                color: isAccountId
                  ? (changed ? COLORS.teal : COLORS.blue)
                  : changed
                    ? COLORS.amber
                    : COLORS.textSecondary,
                fontWeight: isAccountId ? 700 : 400,
              }}
            >
              {part}
            </span>
            {i < arnParts.length - 1 && (
              <span style={{ color: COLORS.textDim }}>:</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
