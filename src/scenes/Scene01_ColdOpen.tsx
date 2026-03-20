import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, ACCOUNTS, SAMPLE_ARNS, SERVICE_TYPES, SPRING_CONFIG } from '../theme/constants';
import { GlowOrb } from '../components/backgrounds/GlowOrb';
import { GlassCard } from '../components/ui/GlassCard';
import { AccountBox } from '../components/diagrams/AccountBox';
import { ArnLabel } from '../components/diagrams/ArnLabel';
import { FlowBlock } from '../components/diagrams/FlowBlock';

export const Scene01_ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene-wide exit fade in last 15 frames (585-600)
  const exitOpacity = interpolate(frame, [585, 600], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 0-30: Subtitle fades in
  const subtitleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 380-480: Title card springs in
  const titleCardProgress = spring({
    frame: frame - 380,
    fps,
    config: SPRING_CONFIG,
  });
  const titleCardScale = interpolate(titleCardProgress, [0, 1], [0.85, 1]);
  const titleCardOpacity = interpolate(titleCardProgress, [0, 1], [0, 1]);

  // 480-540: Main subtitle
  const mainSubOpacity = interpolate(frame, [480, 510], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ARN items with ✕ marks in TARGET (frames 120-250)
  const arnEntries = [
    { arn: SAMPLE_ARNS.lambda, label: 'Lambda', enterFrame: 120 },
    { arn: SAMPLE_ARNS.lex, label: 'Lex', enterFrame: 150 },
    { arn: SAMPLE_ARNS.queue, label: 'Queue', enterFrame: 180 },
  ];

  // SERVICE_TYPES for FlowBlocks (6 types, stagger 15 from frame 250)
  const serviceRows = SERVICE_TYPES.slice(0, 6);

  return (
    <AbsoluteFill style={{ padding: 60, opacity: exitOpacity }}>
      <GlowOrb x={100} y={50} color="rgba(0,212,170,0.04)" size={500} />
      <GlowOrb x={1400} y={600} color="rgba(68,138,255,0.04)" size={400} />

      {/* 0-30: Subtitle */}
      {frame < 120 && (
        <div
          style={{
            opacity: subtitleOpacity,
            position: 'absolute',
            top: 80,
            left: 60,
            right: 60,
          }}
        >
          <p
            style={{
              fontSize: 22,
              color: COLORS.textSecondary,
              fontFamily: "'Inter', sans-serif",
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            Imagine you&apos;ve spent weeks building the perfect contact center...
          </p>
        </div>
      )}

      {/* 30-250: Two AccountBoxes side-by-side */}
      {frame >= 30 && frame < 380 && (
        <div
          style={{
            position: 'absolute',
            top: 150,
            left: 60,
            right: 60,
            display: 'flex',
            gap: 80,
            alignItems: 'flex-start',
          }}
        >
          {/* SOURCE box */}
          <AccountBox
            label={ACCOUNTS.source.label}
            accountId={ACCOUNTS.source.accountId}
            instanceId={ACCOUNTS.source.instanceId}
            color={ACCOUNTS.source.color}
            enterFrame={30}
            width={480}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {arnEntries.map((entry) => (
                <ArnLabel
                  key={entry.label}
                  arn={entry.arn}
                  enterFrame={entry.enterFrame}
                  fontSize={10}
                  highlightAccountId
                />
              ))}
            </div>
          </AccountBox>

          {/* TARGET box with ✕ marks */}
          <AccountBox
            label={ACCOUNTS.target.label}
            accountId={ACCOUNTS.target.accountId}
            instanceId={ACCOUNTS.target.instanceId}
            color={ACCOUNTS.target.color}
            enterFrame={30}
            width={480}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {arnEntries.map((entry) => {
                const xOpacity = interpolate(
                  frame,
                  [entry.enterFrame + 20, entry.enterFrame + 35],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );
                return (
                  <div
                    key={entry.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      opacity: frame >= entry.enterFrame + 20 ? xOpacity : 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        color: COLORS.red,
                        fontWeight: 700,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      ✕
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: COLORS.textDim,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      Wrong account: {entry.label} ARN not found
                    </span>
                  </div>
                );
              })}
            </div>
          </AccountBox>
        </div>
      )}

      {/* 250-380: 6 FlowBlocks in a horizontal row */}
      {frame >= 250 && frame < 380 && (
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            left: 60,
            right: 60,
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
          }}
        >
          {serviceRows.map((svc, i) => (
            <FlowBlock
              key={svc.type}
              label={svc.label}
              icon={svc.icon}
              color={svc.color}
              enterFrame={250 + i * 15}
              triggerFrame={250 + i * 15}
              glowDuration={40}
            />
          ))}
        </div>
      )}

      {/* 380-540: Title card */}
      {frame >= 380 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          <GlassCard
            enterFrame={380}
            padding={48}
            glowColor={COLORS.tealGlow}
            style={{
              transform: `scale(${frame >= 380 ? titleCardScale : 0.85})`,
              opacity: frame >= 380 ? titleCardOpacity : 0,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: COLORS.teal,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: -1,
                lineHeight: 1.1,
              }}
            >
              PACKAGE DEPLOYMENT
              <br />
              CONNECT
            </div>
          </GlassCard>

          {/* 480-540: Subtitle */}
          {frame >= 480 && (
            <div
              style={{
                opacity: mainSubOpacity,
                fontSize: 20,
                color: COLORS.textSecondary,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: 0.5,
                textAlign: 'center',
              }}
            >
              Extract. Package. Deploy. Full ARN Translation.
            </div>
          )}
        </div>
      )}
    </AbsoluteFill>
  );
};
