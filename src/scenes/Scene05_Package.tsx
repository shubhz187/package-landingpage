import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../theme/constants';
import { GlowOrb } from '../components/backgrounds/GlowOrb';
import { GlassCard } from '../components/ui/GlassCard';
import { TerminalBlock } from '../components/ui/TerminalBlock';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Checkmark } from '../components/ui/Checkmark';
import { DynamoDBRow } from '../components/diagrams/DynamoDBRow';
import { S3Bucket } from '../components/diagrams/S3Bucket';

export const Scene05_Package: React.FC = () => {
  const frame = useCurrentFrame();

  // Exit fade: last 15 frames (735-750)
  const exitOpacity = interpolate(frame, [735, 750], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 0-30: Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 550-700: Text
  const textOpacity = interpolate(frame, [550, 580], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ padding: 60, opacity: exitOpacity }}>
      <GlowOrb x={150} y={100} color="rgba(0,212,170,0.04)" size={400} />
      <GlowOrb x={1600} y={700} color="rgba(179,136,255,0.03)" size={350} />

      {/* 0-30: Title */}
      <div style={{ opacity: titleOpacity, marginBottom: 24 }}>
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
          BUILDING THE PACKAGE
        </span>
      </div>

      {/* 30-150: DynamoDBRow with manifest highlighted + arrow label */}
      {frame >= 30 && frame < 300 && (
        <div
          style={{
            opacity: interpolate(frame, [30, 55], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 20,
          }}
        >
          <DynamoDBRow
            enterFrame={30}
            fields={[
              { key: 'InstanceId', value: '183babc4...', highlight: true },
              { key: 'TotalArns', value: '15', highlight: true },
              { key: 'Environment', value: 'BASIC' },
              { key: 'LastUpdated', value: '2026-03-19T14:35:22Z' },
            ]}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              opacity: interpolate(frame, [60, 80], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <span style={{ fontSize: 20, color: COLORS.teal }}>→</span>
            <span
              style={{
                fontSize: 13,
                color: COLORS.teal,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
              }}
            >
              15 ARNs
            </span>
          </div>
        </div>
      )}

      {/* 150-300: SnapshotPackagerService card with ProgressBar */}
      {frame >= 150 && frame < 450 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <GlassCard enterFrame={150} padding={28} width={500} glowColor={COLORS.tealGlow}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: COLORS.teal,
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 12,
              }}
            >
              SnapshotPackagerService
            </div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textSecondary,
                fontFamily: "'Inter', sans-serif",
                marginBottom: 16,
              }}
            >
              Fetching all artifacts from S3 and packaging...
            </div>
            <ProgressBar startFrame={150} duration={120} width={440} />
          </GlassCard>
        </div>
      )}

      {/* 300-450: Terminal showing package contents */}
      {frame >= 300 && frame < 550 && (
        <TerminalBlock
          enterFrame={300}
          width={760}
          title="config-package.zip"
          lines={[
            { text: 'lambda-function-lookupCustomer.json', delay: 0, color: COLORS.orange },
            { text: 'lambda-function-code-lookupCustomer.zip', delay: 10, color: COLORS.orange },
            { text: 'lex-bot-alias-OrderBot.zip', delay: 20, color: COLORS.blue },
            { text: 'connect-queue-SalesQueue.json', delay: 30, color: COLORS.purple },
            { text: 'connect-prompt-Welcome.json + .wav', delay: 40, color: COLORS.amber },
            { text: 'hours-of-operation-BusinessHours.json', delay: 50, color: COLORS.red },
            { text: 'metadata.json', delay: 60, color: COLORS.textSecondary },
          ]}
        />
      )}

      {/* 450-550: Checkmark + S3Bucket */}
      {frame >= 450 && frame < 700 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            opacity: interpolate(frame, [450, 475], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Checkmark triggerFrame={480} size={40} />
            <span
              style={{
                fontSize: 16,
                color: COLORS.green,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
              }}
            >
              Package built
            </span>
          </div>

          <S3Bucket
            enterFrame={460}
            filePath="deployment-packages/183babc4.../basic-2026-03-19/config-package.zip"
            uploadFrame={490}
          />
        </div>
      )}

      {/* 550-700: Closing text */}
      {frame >= 550 && (
        <div
          style={{
            opacity: textOpacity,
            marginTop: 24,
            padding: '16px 24px',
            background: COLORS.bgCard,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            maxWidth: 700,
          }}
        >
          <p
            style={{
              fontSize: 16,
              color: COLORS.textSecondary,
              fontFamily: "'Inter', sans-serif",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Versioned by timestamp. Ready to travel across accounts.
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
