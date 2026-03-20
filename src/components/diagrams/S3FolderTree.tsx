import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../../theme/constants';

interface FolderItem {
  name: string;
  type: 'folder' | 'file';
  color?: string;
  indent: number; // 0, 1, 2... for nesting depth
}

interface S3FolderTreeProps {
  items: FolderItem[];
  enterFrame?: number;
  staggerFrames?: number; // frames between each item appearing (default 8)
  style?: React.CSSProperties;
}

export const S3FolderTree: React.FC<S3FolderTreeProps> = ({
  items,
  enterFrame = 0,
  staggerFrames = 8,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring enter for the whole container
  const containerProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const containerOpacity = interpolate(containerProgress, [0, 1], [0, 1]);
  const containerY = interpolate(containerProgress, [0, 1], [12, 0]);

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        opacity: containerOpacity,
        transform: `translateY(${containerY}px)`,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        ...style,
      }}
    >
      {items.map((item, index) => {
        const itemEnterFrame = enterFrame + index * staggerFrames;
        const itemProgress = interpolate(
          frame,
          [itemEnterFrame, itemEnterFrame + 10],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const itemOpacity = itemProgress;
        const itemX = interpolate(itemProgress, [0, 1], [-15, 0]);

        if (frame < itemEnterFrame) return null;

        const prefix = item.type === 'folder' ? '📁' : '📄';
        const textColor =
          item.type === 'folder'
            ? COLORS.textPrimary
            : item.color ?? COLORS.textSecondary;

        return (
          <div
            key={index}
            style={{
              marginLeft: item.indent * 24,
              opacity: itemOpacity,
              transform: `translateX(${itemX}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ fontSize: item.type === 'folder' ? 14 : 12 }}>
              {prefix}
            </span>
            <span
              style={{
                fontSize: item.type === 'folder' ? 13 : 12,
                fontWeight: item.type === 'folder' ? 600 : 400,
                color: textColor,
                fontFamily:
                  item.type === 'file'
                    ? "'JetBrains Mono', monospace"
                    : "'Inter', sans-serif",
              }}
            >
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
