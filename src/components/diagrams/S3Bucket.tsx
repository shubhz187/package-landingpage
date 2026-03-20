import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../../theme/constants';
import { ServiceIcon } from './ServiceIcon';

interface S3BucketProps {
  bucketName?: string;
  filePath?: string;
  uploadFrame?: number;
  enterFrame?: number;
  style?: React.CSSProperties;
}

export const S3Bucket: React.FC<S3BucketProps> = ({
  bucketName = 'ci-cd-config-store-demo-us',
  filePath,
  uploadFrame,
  enterFrame = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);

  const fileY = uploadFrame
    ? interpolate(
        frame,
        [uploadFrame, uploadFrame + 20],
        [-30, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 0;

  const fileOpacity = uploadFrame
    ? interpolate(frame, [uploadFrame, uploadFrame + 10], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        padding: 16,
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 10,
        opacity,
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <ServiceIcon type="s3" size={20} />
        <span style={{ fontSize: 13, color: COLORS.textPrimary, fontWeight: 600 }}>
          S3
        </span>
      </div>
      <div
        style={{
          fontSize: 11,
          color: COLORS.textDim,
          fontFamily: "'JetBrains Mono', monospace",
          marginBottom: 8,
        }}
      >
        {bucketName}
      </div>
      {filePath && (
        <div
          style={{
            fontSize: 11,
            color: COLORS.teal,
            fontFamily: "'JetBrains Mono', monospace",
            padding: '4px 8px',
            background: COLORS.tealDim,
            borderRadius: 4,
            opacity: fileOpacity,
            transform: `translateY(${fileY}px)`,
          }}
        >
          {filePath}
        </div>
      )}
    </div>
  );
};
