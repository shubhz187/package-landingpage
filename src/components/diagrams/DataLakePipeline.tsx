import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../../theme/constants';
import { ServiceIcon } from './ServiceIcon';

interface DataLakeStage {
  id: string;
  label: string;
  icon: string;
}

interface DataLakePipelineProps {
  stages: DataLakeStage[];
  enterFrame?: number;
  activationStartFrame?: number;
  staggerFrames?: number; // default 40
  style?: React.CSSProperties;
}

const STAGE_BOX_WIDTH = 140;
const STAGE_BOX_HEIGHT = 80;

export const DataLakePipeline: React.FC<DataLakePipelineProps> = ({
  stages,
  enterFrame = 0,
  activationStartFrame,
  staggerFrames = 40,
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
  const containerY = interpolate(containerProgress, [0, 1], [16, 0]);

  const actStart = activationStartFrame ?? enterFrame + 20;

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        opacity: containerOpacity,
        transform: `translateY(${containerY}px)`,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        ...style,
      }}
    >
      {/* ASYNC badge */}
      <div
        style={{
          padding: '4px 10px',
          background: COLORS.purpleDim,
          border: `1px solid ${COLORS.purple}60`,
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          color: COLORS.purple,
          letterSpacing: 1,
          marginRight: 16,
          fontFamily: "'Inter', sans-serif",
          whiteSpace: 'nowrap',
        }}
      >
        ASYNC
      </div>

      {stages.map((stage, index) => {
        const stageActivationFrame = actStart + index * staggerFrames;
        const isActive = frame >= stageActivationFrame;

        const glowProgress = isActive
          ? interpolate(
              frame,
              [stageActivationFrame, stageActivationFrame + 20],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            )
          : 0;

        const borderColor = isActive ? COLORS.teal : COLORS.border;
        const bgColor = isActive ? COLORS.tealDim : 'rgba(255,255,255,0.02)';
        const iconOpacity = isActive ? 1 : 0.3;
        const labelColor = isActive ? COLORS.textPrimary : COLORS.textDim;
        const boxShadow =
          glowProgress > 0
            ? `0 0 ${16 * glowProgress}px ${COLORS.tealGlow}`
            : 'none';

        return (
          <React.Fragment key={stage.id}>
            {/* Stage box */}
            <div
              style={{
                width: STAGE_BOX_WIDTH,
                height: STAGE_BOX_HEIGHT,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: bgColor,
                border: `1px solid ${borderColor}`,
                borderRadius: 10,
                boxShadow,
                padding: '0 8px',
                transition: 'background 0.1s',
              }}
            >
              <div style={{ opacity: iconOpacity }}>
                <ServiceIcon type={stage.icon} size={28} />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: labelColor,
                  fontFamily: "'Inter', sans-serif",
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {stage.label}
              </span>
            </div>

            {/* Arrow connector between stages */}
            {index < stages.length - 1 && (
              <svg
                width={36}
                height={20}
                style={{ flexShrink: 0 }}
              >
                <line
                  x1={2}
                  y1={10}
                  x2={26}
                  y2={10}
                  stroke={
                    frame >= actStart + index * staggerFrames
                      ? COLORS.teal
                      : COLORS.border
                  }
                  strokeWidth={1.5}
                  opacity={
                    frame >= actStart + index * staggerFrames ? 0.7 : 0.4
                  }
                />
                <polygon
                  points="26,5 36,10 26,15"
                  fill={
                    frame >= actStart + index * staggerFrames
                      ? COLORS.teal
                      : COLORS.border
                  }
                  opacity={
                    frame >= actStart + index * staggerFrames ? 0.7 : 0.4
                  }
                />
              </svg>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
