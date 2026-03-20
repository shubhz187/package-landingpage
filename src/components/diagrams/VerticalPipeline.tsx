import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG } from '../../theme/constants';
import { ServiceIcon } from './ServiceIcon';

type StageState = 'inactive' | 'active' | 'current' | 'failed';

interface VerticalPipelineProps {
  stages: Array<{ id: string; label: string; icon: string }>;
  stageStates: StageState[]; // state for each stage
  enterFrame?: number;
  style?: React.CSSProperties;
}

const STAGE_WIDTH = 280;
const STAGE_HEIGHT = 44;
const CONNECTOR_HEIGHT = 6;

export const VerticalPipeline: React.FC<VerticalPipelineProps> = ({
  stages,
  stageStates,
  enterFrame = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring enter for the entire container
  const containerProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const containerOpacity = interpolate(containerProgress, [0, 1], [0, 1]);
  const containerY = interpolate(containerProgress, [0, 1], [20, 0]);

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        opacity: containerOpacity,
        transform: `translateY(${containerY}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        ...style,
      }}
    >
      {stages.map((stage, index) => {
        const state: StageState = stageStates[index] ?? 'inactive';
        const pulse = state === 'current' ? Math.sin(frame * 0.1) : 0;

        // State-driven styles
        const bgColor =
          state === 'active'
            ? COLORS.greenDim
            : state === 'current'
              ? COLORS.tealDim
              : state === 'failed'
                ? COLORS.redDim
                : COLORS.bgCard;

        const borderColor =
          state === 'active'
            ? `${COLORS.green}60`
            : state === 'current'
              ? COLORS.teal
              : state === 'failed'
                ? COLORS.red
                : COLORS.border;

        const textColor =
          state === 'active'
            ? COLORS.green
            : state === 'current'
              ? COLORS.teal
              : state === 'failed'
                ? COLORS.red
                : COLORS.textDim;

        const glowAmount =
          state === 'current' ? 12 + pulse * 8 : 0;

        const boxShadow =
          state === 'current'
            ? `0 0 ${glowAmount}px ${COLORS.teal}`
            : state === 'active'
              ? `0 0 8px ${COLORS.green}40`
              : 'none';

        return (
          <React.Fragment key={stage.id}>
            {/* Stage box */}
            <div
              style={{
                width: STAGE_WIDTH,
                height: STAGE_HEIGHT,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '0 14px',
                background: bgColor,
                border: `1px solid ${borderColor}`,
                borderRadius: 8,
                boxShadow,
                position: 'relative',
              }}
            >
              <ServiceIcon type={stage.icon} size={18} />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: textColor,
                  fontFamily: "'Inter', sans-serif",
                  flex: 1,
                }}
              >
                {stage.label}
              </span>
              {/* Right-side indicator */}
              {state === 'active' && (
                <span style={{ fontSize: 14, color: COLORS.green }}>✓</span>
              )}
              {state === 'failed' && (
                <span style={{ fontSize: 14, color: COLORS.red }}>✕</span>
              )}
            </div>

            {/* Vertical arrow connector between stages */}
            {index < stages.length - 1 && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: CONNECTOR_HEIGHT + 8,
                }}
              >
                <svg
                  width={12}
                  height={CONNECTOR_HEIGHT + 8}
                  style={{ display: 'block' }}
                >
                  <line
                    x1={6}
                    y1={0}
                    x2={6}
                    y2={CONNECTOR_HEIGHT + 4}
                    stroke={COLORS.border}
                    strokeWidth={1.5}
                  />
                  <polygon
                    points={`3,${CONNECTOR_HEIGHT + 2} 9,${CONNECTOR_HEIGHT + 2} 6,${CONNECTOR_HEIGHT + 8}`}
                    fill={COLORS.border}
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
