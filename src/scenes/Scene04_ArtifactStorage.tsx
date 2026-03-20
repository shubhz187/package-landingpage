import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../theme/constants';
import { GlowOrb } from '../components/backgrounds/GlowOrb';
import { DynamoDBRow } from '../components/diagrams/DynamoDBRow';
import { S3FolderTree } from '../components/diagrams/S3FolderTree';

export const Scene04_ArtifactStorage: React.FC = () => {
  const frame = useCurrentFrame();

  // Exit fade: last 15 frames (885-900)
  const exitOpacity = interpolate(frame, [885, 900], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 0-30: Title fade in
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 800-850: Callout text
  const calloutOpacity = interpolate(frame, [800, 825], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const folderItems = [
    { name: 'package-deployer-bucket-basic/', type: 'folder' as const, indent: 0 },
    { name: 'snapshots/', type: 'folder' as const, indent: 1 },
    { name: 'lambda-function/', type: 'folder' as const, indent: 2, color: COLORS.orange },
    { name: 'lookupCustomer.json', type: 'file' as const, indent: 3, color: COLORS.orange },
    { name: 'lookupCustomer-code.zip', type: 'file' as const, indent: 3, color: COLORS.orange },
    { name: 'lex-bot-alias/', type: 'folder' as const, indent: 2, color: COLORS.blue },
    { name: 'OrderBot-export.zip', type: 'file' as const, indent: 3, color: COLORS.blue },
    { name: 'connect-queue/', type: 'folder' as const, indent: 2, color: COLORS.purple },
    { name: 'SalesQueue.json', type: 'file' as const, indent: 3, color: COLORS.purple },
    { name: 'connect-prompt/', type: 'folder' as const, indent: 2, color: COLORS.amber },
    { name: 'Welcome.json', type: 'file' as const, indent: 3, color: COLORS.amber },
    { name: 'Welcome.wav', type: 'file' as const, indent: 3, color: COLORS.amber },
    { name: 'hours-of-operation/', type: 'folder' as const, indent: 2, color: COLORS.red },
    { name: 'BusinessHours.json', type: 'file' as const, indent: 3, color: COLORS.red },
  ];

  return (
    <AbsoluteFill style={{ padding: 60, opacity: exitOpacity }}>
      <GlowOrb x={100} y={100} color="rgba(255,140,0,0.03)" size={450} />
      <GlowOrb x={1500} y={500} color="rgba(0,212,170,0.03)" size={380} />

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
          ARTIFACT STORAGE
        </span>
      </div>

      {/* Main two-column layout */}
      <div
        style={{
          display: 'flex',
          gap: 60,
          alignItems: 'flex-start',
          position: 'relative',
        }}
      >
        {/* LEFT: S3FolderTree (30-400) */}
        <div style={{ flex: '0 0 420px' }}>
          {frame >= 30 && (
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.orange,
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: 12,
                  opacity: interpolate(frame, [30, 50], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }}
              >
                s3://
              </div>
              <S3FolderTree
                items={folderItems}
                enterFrame={30}
                staggerFrames={10}
              />
            </div>
          )}
        </div>

        {/* Arrow connector from S3 to DynamoDB area (400-500) */}
        {frame >= 400 && (
          <div
            style={{
              position: 'absolute',
              left: 440,
              top: 120,
              opacity: interpolate(frame, [400, 430], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <svg width={120} height={40}>
              <line
                x1={0}
                y1={20}
                x2={100}
                y2={20}
                stroke={COLORS.teal}
                strokeWidth={1.5}
                strokeDasharray={`${interpolate(frame, [400, 440], [120, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}`}
                strokeDashoffset={`${interpolate(frame, [400, 440], [120, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}`}
              />
              <polygon points="100,14 112,20 100,26" fill={COLORS.teal} opacity={0.8} />
            </svg>
          </div>
        )}

        {/* RIGHT: DynamoDB section (500-800) */}
        {frame >= 500 && (
          <div
            style={{
              flex: 1,
              opacity: interpolate(frame, [500, 530], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: COLORS.teal,
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 20,
              }}
            >
              connect-flow-mappings
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <DynamoDBRow
                enterFrame={520}
                fields={[
                  { key: 'InstanceId', value: '183babc4...', highlight: true },
                  { key: 'Environment', value: 'BASIC' },
                ]}
              />
              <DynamoDBRow
                enterFrame={570}
                fields={[
                  { key: 'all-arns', value: '(15 ARNs)', highlight: true },
                  { key: 'TotalArns', value: '15' },
                ]}
              />
              <DynamoDBRow
                enterFrame={620}
                fields={[
                  { key: 'LastUpdated', value: '2026-03-19T14:35:22Z' },
                  { key: 'UpdatedBy', value: 'admin' },
                ]}
              />
            </div>

            {/* 800-850: Callout */}
            {frame >= 800 && (
              <div
                style={{
                  marginTop: 28,
                  opacity: calloutOpacity,
                  padding: '14px 20px',
                  background: COLORS.tealDim,
                  border: `1px solid ${COLORS.borderTeal}`,
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: COLORS.teal,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Extraction manifest — bill of materials
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: COLORS.textSecondary,
                    fontFamily: "'Inter', sans-serif",
                    marginTop: 6,
                  }}
                >
                  Every ARN recorded. Every resource accounted for.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
