import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, EXTRACTORS, SERVICE_TYPES } from '../theme/constants';
import { GlowOrb } from '../components/backgrounds/GlowOrb';
import { GlassCard } from '../components/ui/GlassCard';
import { FlowBlock } from '../components/diagrams/FlowBlock';
import { JsonDocument } from '../components/diagrams/JsonDocument';
import { DispatcherDiagram } from '../components/diagrams/DispatcherDiagram';

export const Scene03_Extraction: React.FC = () => {
  const frame = useCurrentFrame();

  // Exit fade: last 15 frames (1035-1050)
  const exitOpacity = interpolate(frame, [1035, 1050], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 0-30: Title fade in
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 700-1000: Text + FlowBlocks appear
  const phase4Opacity = interpolate(frame, [700, 730], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const serviceRows = SERVICE_TYPES.slice(0, 6);

  return (
    <AbsoluteFill style={{ padding: 60, opacity: exitOpacity }}>
      <GlowOrb x={200} y={100} color="rgba(0,212,170,0.04)" size={450} />
      <GlowOrb x={1600} y={800} color="rgba(68,138,255,0.03)" size={380} />

      {/* 0-30: Title */}
      <div style={{ opacity: titleOpacity, marginBottom: 20 }}>
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
          THE EXTRACTION
        </div>
        <div
          style={{
            fontSize: 14,
            color: COLORS.textSecondary,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Tracing the Flow
        </div>
      </div>

      {/* 30-100: GlassCard for ConnectFlowExtractorService */}
      {frame >= 30 && frame < 350 && (
        <GlassCard enterFrame={30} padding={20} width={520} glowColor={COLORS.tealGlow}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.teal,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            ConnectFlowExtractorService
          </div>
          <div
            style={{
              fontSize: 12,
              color: COLORS.textSecondary,
              fontFamily: "'Inter', sans-serif",
              marginTop: 6,
            }}
          >
            Parses contact flow JSON to discover embedded ARNs
          </div>
        </GlassCard>
      )}

      {/* 100-350: JsonDocument */}
      {frame >= 100 && frame < 700 && (
        <div style={{ marginTop: 24 }}>
          <JsonDocument
            enterFrame={100}
            width={680}
            lines={[
              { text: '{ "Actions": [{' },
              { text: '  "Type": "InvokeLambdaFunction",' },
              { text: '  "Parameters": {' },
              {
                text: '    "LambdaFunctionARN": "arn:aws:lambda:...111:function:lookupCustomer"',
                highlightFrame: 200,
                highlightColor: COLORS.orange,
              },
              { text: '  }' },
              { text: '}, {' },
              { text: '  "Type": "ConnectParticipantWithLexBot",' },
              { text: '  "Parameters": {' },
              {
                text: '    "LexBot": "arn:aws:lex:...111:bot-alias/ABCDEF/GHIJKL"',
                highlightFrame: 250,
                highlightColor: COLORS.blue,
              },
              { text: '  }' },
              { text: '}]' },
            ]}
          />
        </div>
      )}

      {/* 350-700: DispatcherDiagram */}
      {frame >= 350 && frame < 700 && (
        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
          <DispatcherDiagram
            extractors={EXTRACTORS.map((e) => ({
              label: e.label,
              output: e.output,
              color: e.color,
            }))}
            enterFrame={350}
            activationStartFrame={400}
            staggerFrames={20}
          />
        </div>
      )}

      {/* 700-1000: Text + 6 FlowBlocks */}
      {frame >= 700 && (
        <div style={{ opacity: phase4Opacity }}>
          <div
            style={{
              fontSize: 18,
              color: COLORS.textPrimary,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Each extractor knows exactly what to pull.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 14 }}>
            {serviceRows.map((svc, i) => (
              <FlowBlock
                key={svc.type}
                label={svc.label}
                icon={svc.icon}
                color={svc.color}
                enterFrame={700 + i * 20}
                triggerFrame={700 + i * 20}
                glowDuration={50}
                style={{ minWidth: 160 }}
              />
            ))}
          </div>
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              flexWrap: 'wrap' as const,
              gap: 10,
            }}
          >
            {EXTRACTORS.map((e, i) => {
              const eOpacity = interpolate(
                frame,
                [740 + i * 25, 760 + i * 25],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              );
              return (
                <div
                  key={e.id}
                  style={{
                    opacity: eOpacity,
                    padding: '6px 12px',
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${e.color}44`,
                    borderRadius: 6,
                    fontSize: 11,
                    color: e.color,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  → {e.output}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
