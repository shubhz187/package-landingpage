import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, DATALAKE_STAGES } from '../theme/constants';
import { GlowOrb } from '../components/backgrounds/GlowOrb';
import { GlassCard } from '../components/ui/GlassCard';
import { Checkmark } from '../components/ui/Checkmark';
import { TerminalBlock } from '../components/ui/TerminalBlock';
import { StatusBadge } from '../components/ui/StatusBadge';
import { DataLakePipeline } from '../components/diagrams/DataLakePipeline';

export const Scene08_DataLake: React.FC = () => {
  const frame = useCurrentFrame();

  // Exit fade: last 15 frames (585-600)
  const exitOpacity = interpolate(frame, [585, 600], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 0-30: Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 530-600: Closing text
  const closingOpacity = interpolate(frame, [530, 560], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ padding: 60, opacity: exitOpacity }}>
      <GlowOrb x={200} y={100} color="rgba(179,136,255,0.05)" size={500} />
      <GlowOrb x={1500} y={700} color="rgba(0,212,170,0.04)" size={400} />

      {/* 0-30: Title */}
      <div style={{ opacity: titleOpacity, marginBottom: 8 }}>
        <div
          style={{
            fontSize: 16,
            color: COLORS.teal,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: 3,
            textTransform: 'uppercase' as const,
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          THE DATA LAKE
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.textSecondary,
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'italic',
          }}
        >
          Advanced Flow Only
        </div>
      </div>

      {/* Top row: completion card + async badge */}
      {frame >= 30 && (
        <div
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 32,
          }}
        >
          {/* 30-80: Deployment Complete card */}
          <GlassCard enterFrame={30} padding={22} width={320} glowColor={COLORS.tealGlow}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Checkmark triggerFrame={45} size={30} />
              <div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  DEPLOYMENT COMPLETE
                </div>
                <StatusBadge
                  label="ADVANCED"
                  color={COLORS.teal}
                  enterFrame={50}
                  style={{ marginTop: 8 }}
                />
              </div>
            </div>
          </GlassCard>

          {/* Arrow to pipeline */}
          {frame >= 80 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity: interpolate(frame, [80, 110], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            >
              <svg width={80} height={24}>
                <line
                  x1={0}
                  y1={12}
                  x2={62}
                  y2={12}
                  stroke={COLORS.purple}
                  strokeWidth={1.5}
                  strokeDasharray="5 3"
                  opacity={0.7}
                />
                <polygon points="62,7 74,12 62,17" fill={COLORS.purple} opacity={0.7} />
              </svg>
              <StatusBadge
                label="ASYNC"
                color={COLORS.purple}
                enterFrame={90}
              />
            </div>
          )}
        </div>
      )}

      {/* 120-450: DataLakePipeline */}
      {frame >= 120 && frame < 530 && (
        <div style={{ marginBottom: 32 }}>
          <DataLakePipeline
            stages={[...DATALAKE_STAGES]}
            enterFrame={120}
            activationStartFrame={150}
            staggerFrames={50}
          />
        </div>
      )}

      {/* 450-530: Returns jobId GlassCard */}
      {frame >= 450 && frame < 585 && (
        <GlassCard
          enterFrame={450}
          padding={24}
          width={640}
          glowColor="rgba(179,136,255,0.2)"
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.textPrimary,
              fontFamily: "'Inter', sans-serif",
              marginBottom: 14,
            }}
          >
            Returns jobId for async tracking
          </div>
          <TerminalBlock
            enterFrame={465}
            width={560}
            title="Response"
            lines={[
              {
                text: 'jobId: "dlk-7f3a9b21"',
                delay: 0,
                color: COLORS.teal,
                prefix: '',
              },
              {
                text: 'statusUrl: "/api/datalake/status/dlk-7f3a9b21"',
                delay: 20,
                color: COLORS.textSecondary,
                prefix: '',
              },
            ]}
          />
        </GlassCard>
      )}

      {/* 530-600: Closing text */}
      {frame >= 530 && (
        <div
          style={{
            opacity: closingOpacity,
            marginTop: 24,
            padding: '18px 24px',
            background: COLORS.bgCard,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            maxWidth: 760,
          }}
        >
          <p
            style={{
              fontSize: 17,
              color: COLORS.textSecondary,
              fontFamily: "'Inter', sans-serif",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Not just a contact center — a fully functional analytics layer
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
