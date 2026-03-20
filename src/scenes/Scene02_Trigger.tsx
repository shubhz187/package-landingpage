import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../theme/constants';
import { GlowOrb } from '../components/backgrounds/GlowOrb';
import { GlassCard } from '../components/ui/GlassCard';
import { TerminalBlock } from '../components/ui/TerminalBlock';
import { StatusBadge } from '../components/ui/StatusBadge';
import { WebUIMockup } from '../components/diagrams/WebUIMockup';
import { PostRequestArrow } from '../components/diagrams/PostRequestArrow';

export const Scene02_Trigger: React.FC = () => {
  const frame = useCurrentFrame();

  // Exit fade: last 15 frames (735-750)
  const exitOpacity = interpolate(frame, [735, 750], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 0-30: Section title fade in
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 500-650: Callout GlassCard fade in
  const calloutOpacity = interpolate(frame, [500, 530], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ padding: 60, opacity: exitOpacity }}>
      <GlowOrb x={300} y={200} color="rgba(0,212,170,0.04)" size={400} />
      <GlowOrb x={1500} y={700} color="rgba(68,138,255,0.03)" size={350} />

      {/* 0-30: Section title */}
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
          THE TRIGGER
        </span>
      </div>

      {/* Main layout: two columns */}
      <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start', marginTop: 8 }}>
        {/* Left column: Web UI + PostRequest + Terminal */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 28 }}>

          {/* 30-200: WebUIMockup */}
          {frame >= 30 && frame < 500 && (
            <WebUIMockup
              enterFrame={30}
              formFillFrame={100}
              buttonClickFrame={180}
              style={{ maxWidth: 700 }}
            />
          )}

          {/* 200-350: PostRequestArrow */}
          {frame >= 200 && frame < 500 && (
            <PostRequestArrow
              fromLabel="Browser"
              toLabel="Spring Boot :8080"
              method="POST"
              path="/connect/map"
              enterFrame={200}
              flyDuration={40}
            />
          )}

          {/* 350-500: TerminalBlock */}
          {frame >= 350 && frame < 650 && (
            <TerminalBlock
              enterFrame={350}
              width={720}
              title="HTTP Request / Response"
              lines={[
                {
                  text: 'POST /connect/map?instanceId=183babc4&contactFlowId=6c0921ae',
                  delay: 0,
                  color: COLORS.teal,
                  prefix: '>',
                },
                {
                  text: '→ 200 OK | Extracted 15 ARNs',
                  delay: 30,
                  color: COLORS.green,
                  prefix: '',
                },
              ]}
            />
          )}
        </div>

        {/* Right column: Callout card (500-650) */}
        {frame >= 500 && (
          <div style={{ width: 380, opacity: calloutOpacity }}>
            <GlassCard
              enterFrame={500}
              padding={28}
              glowColor="rgba(255,191,0,0.2)"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Today: operator-initiated
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: COLORS.textDim,
                    fontFamily: "'Inter', sans-serif",
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                  }}
                >
                  Coming: EventBridge auto-trigger on flow changes
                </div>
                <StatusBadge
                  label="ROADMAP"
                  color={COLORS.amber}
                  enterFrame={520}
                />
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
