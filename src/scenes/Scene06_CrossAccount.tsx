import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, ACCOUNTS, SPRING_CONFIG, SPRING_FAST } from '../theme/constants';
import { GlowOrb } from '../components/backgrounds/GlowOrb';
import { GlassCard } from '../components/ui/GlassCard';
import { Checkmark } from '../components/ui/Checkmark';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AccountBox } from '../components/diagrams/AccountBox';

export const Scene06_CrossAccount: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

  // 250-350: Temp credentials card
  const credCardProgress = spring({
    frame: frame - 250,
    fps,
    config: SPRING_CONFIG,
  });
  const credCardOpacity = interpolate(credCardProgress, [0, 1], [0, 1]);
  const credCardY = interpolate(credCardProgress, [0, 1], [20, 0]);

  // Pill (token) flying animation: 80-180
  const pillProgress = interpolate(frame, [80, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pillX = interpolate(pillProgress, [0, 1], [0, 560]);
  const pillOpacity = interpolate(pillProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 350-480: Target-side: searching, then creating instance
  const searchOpacity = interpolate(frame, [350, 380], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const creatingOpacity = interpolate(frame, [390, 420], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Lock icon spring
  const lockProgress = spring({ frame: frame - 50, fps, config: SPRING_FAST });
  const lockOpacity = interpolate(lockProgress, [0, 1], [0, 1]);
  const lockScale = interpolate(lockProgress, [0, 1], [0.6, 1]);

  return (
    <AbsoluteFill style={{ padding: 60, opacity: exitOpacity }}>
      <GlowOrb x={200} y={200} color="rgba(68,138,255,0.05)" size={450} />
      <GlowOrb x={1400} y={400} color="rgba(0,230,118,0.04)" size={400} />

      {/* 0-30: Title */}
      <div style={{ opacity: titleOpacity, marginBottom: 36 }}>
        <span
          style={{
            fontSize: 16,
            color: COLORS.teal,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: 3,
            textTransform: 'uppercase' as const,
            fontWeight: 700,
          }}
        >
          CROSSING ACCOUNTS
        </span>
      </div>

      {/* 30-250: Two AccountBoxes + STS connector */}
      {frame >= 30 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 0,
            position: 'relative',
          }}
        >
          {/* SOURCE */}
          <AccountBox
            label={ACCOUNTS.source.label}
            accountId={ACCOUNTS.source.accountId}
            instanceId={ACCOUNTS.source.instanceId}
            color={ACCOUNTS.source.color}
            enterFrame={30}
            width={340}
          >
            <div
              style={{
                marginTop: 12,
                padding: '8px 12px',
                background: COLORS.blueDim,
                border: `1px solid ${COLORS.blue}44`,
                borderRadius: 6,
                fontSize: 11,
                color: COLORS.blue,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              config-package.zip
            </div>
          </AccountBox>

          {/* Arrow + Lock in middle */}
          {frame >= 50 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 220,
                paddingTop: 40,
                gap: 8,
                position: 'relative',
              }}
            >
              {/* Horizontal arrow */}
              <svg width={200} height={24} style={{ display: 'block' }}>
                <line
                  x1={10}
                  y1={12}
                  x2={180}
                  y2={12}
                  stroke={COLORS.teal}
                  strokeWidth={1.5}
                  strokeDasharray="6 4"
                  opacity={0.6}
                />
                <polygon points="180,7 192,12 180,17" fill={COLORS.teal} opacity={0.8} />
              </svg>

              {/* Lock icon */}
              <div
                style={{
                  opacity: lockOpacity,
                  transform: `scale(${lockScale})`,
                  fontSize: 24,
                  lineHeight: 1,
                }}
              >
                🔐
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.teal,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  textAlign: 'center',
                  opacity: lockOpacity,
                }}
              >
                STS AssumeRole
              </div>

              {/* Flying token pill */}
              {frame >= 80 && (
                <div
                  style={{
                    position: 'absolute',
                    left: pillX,
                    top: 10,
                    opacity: pillOpacity,
                    padding: '3px 10px',
                    background: COLORS.teal,
                    borderRadius: 4,
                    fontSize: 9,
                    fontWeight: 700,
                    color: '#000',
                    fontFamily: "'JetBrains Mono', monospace",
                    whiteSpace: 'nowrap',
                    boxShadow: `0 0 8px ${COLORS.tealGlow}`,
                  }}
                >
                  CrossAccountDeploymentRole
                </div>
              )}
            </div>
          )}

          {/* TARGET */}
          <AccountBox
            label={ACCOUNTS.target.label}
            accountId={ACCOUNTS.target.accountId}
            instanceId={ACCOUNTS.target.instanceId}
            color={ACCOUNTS.target.color}
            enterFrame={40}
            width={340}
          >
            {/* 350-480: Search + create on target side */}
            {frame >= 350 && (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ opacity: searchOpacity, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>🔍</span>
                  <span
                    style={{
                      fontSize: 11,
                      color: COLORS.textSecondary,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Instance not found → Creating...
                  </span>
                </div>
                {frame >= 390 && (
                  <div style={{ opacity: creatingOpacity }}>
                    <ProgressBar startFrame={390} duration={60} width={280} />
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Checkmark triggerFrame={460} size={20} />
                  <span
                    style={{
                      fontSize: 11,
                      color: COLORS.green,
                      fontFamily: "'Inter', sans-serif',",
                      opacity: frame >= 460
                        ? interpolate(frame, [460, 475], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                          })
                        : 0,
                    }}
                  >
                    Instance created: target-connect
                  </span>
                </div>
              </div>
            )}
          </AccountBox>
        </div>
      )}

      {/* 250-350: Temporary Credentials card */}
      {frame >= 250 && (
        <div
          style={{
            marginTop: 32,
            opacity: credCardOpacity,
            transform: `translateY(${credCardY}px)`,
          }}
        >
          <GlassCard enterFrame={250} padding={24} width={480} glowColor={COLORS.tealGlow}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Checkmark triggerFrame={270} size={28} />
              <div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Temporary Credentials
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: COLORS.textSecondary,
                    fontFamily: "'Inter', sans-serif",
                    marginTop: 4,
                  }}
                >
                  15-min session · Scoped to target account
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </AbsoluteFill>
  );
};
