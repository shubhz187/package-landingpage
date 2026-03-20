import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, DEPLOY_STAGES, SAMPLE_ARNS, TARGET_ARNS } from '../theme/constants';
import { GlowOrb } from '../components/backgrounds/GlowOrb';
import { GlassCard } from '../components/ui/GlassCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ParticleBurst } from '../components/ui/ParticleBurst';
import { ArnLabel } from '../components/diagrams/ArnLabel';
import { VerticalPipeline } from '../components/diagrams/VerticalPipeline';
import { ArnTranslationMap } from '../components/diagrams/ArnTranslationMap';

type StageState = 'inactive' | 'active' | 'current' | 'failed';

// Transition frames per stage: { current, active }
const STAGE_TRANSITIONS = [
  { current: 100, active: 200 },  // Lambda
  { current: 250, active: 340 },  // Lex
  { current: 380, active: 450 },  // Hours
  { current: 480, active: 560 },  // Prompts
  { current: 580, active: 680 },  // Queues
  { current: 700, active: 790 },  // Routing
  { current: 800, active: 1000 }, // Flows (critical path)
];

const getStageStates = (f: number): StageState[] => {
  // Resilience demo: frame 1050+
  if (f >= 1050) {
    return [
      'active',   // Lambda
      'active',   // Lex
      'active',   // Hours
      'failed',   // Prompts - failed
      'active',   // Queues
      'active',   // Routing
      'active',   // Flows
    ];
  }

  return STAGE_TRANSITIONS.map((t) => {
    if (f >= t.active) return 'active';
    if (f >= t.current) return 'current';
    return 'inactive';
  });
};

// ARN translation map entries that appear as stages complete
const mapEntries = [
  {
    label: 'Lambda',
    color: COLORS.orange,
    sourceArn: SAMPLE_ARNS.lambda,
    targetArn: TARGET_ARNS.lambda,
    enterFrame: 200,
  },
  {
    label: 'Lex',
    color: COLORS.blue,
    sourceArn: SAMPLE_ARNS.lex,
    targetArn: TARGET_ARNS.lex,
    enterFrame: 340,
  },
  {
    label: 'Hours',
    color: COLORS.red,
    sourceArn: SAMPLE_ARNS.hours,
    targetArn: TARGET_ARNS.hours,
    enterFrame: 450,
  },
  {
    label: 'Prompt',
    color: COLORS.amber,
    sourceArn: SAMPLE_ARNS.prompt,
    targetArn: TARGET_ARNS.prompt,
    enterFrame: 560,
  },
  {
    label: 'Queue',
    color: COLORS.purple,
    sourceArn: SAMPLE_ARNS.queue,
    targetArn: TARGET_ARNS.queue,
    enterFrame: 680,
  },
  {
    label: 'Flow',
    color: COLORS.green,
    sourceArn: SAMPLE_ARNS.flow,
    targetArn: TARGET_ARNS.flow,
    enterFrame: 1000,
  },
];

export const Scene07_DeployPipeline: React.FC = () => {
  const frame = useCurrentFrame();

  // Exit fade: last 15 frames (1485-1500)
  const exitOpacity = interpolate(frame, [1485, 1500], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 0-30: Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const stageStates = getStageStates(frame);

  // 580-700: Queue callout (hours ARN inside queue)
  const queueCalloutOpacity = interpolate(frame, [580, 610], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 1050-1250: Resilience demo
  const resilienceOpacity = interpolate(frame, [1050, 1080], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 1250-1400: Deployment complete
  const completeOpacity = interpolate(frame, [1250, 1280], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Filter entries that are visible at current frame
  const visibleEntries = mapEntries.filter((e) => frame >= e.enterFrame);

  return (
    <AbsoluteFill style={{ padding: 60, opacity: exitOpacity }}>
      <GlowOrb x={300} y={100} color="rgba(0,212,170,0.04)" size={500} />
      <GlowOrb x={1500} y={800} color="rgba(0,230,118,0.03)" size={400} />

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
          THE SEVEN-STAGE PIPELINE
        </span>
      </div>

      {/* Main layout: VerticalPipeline left (40%) + ArnTranslationMap right (55%) */}
      {frame >= 30 && frame < 1050 && (
        <div
          style={{
            display: 'flex',
            gap: 48,
            alignItems: 'flex-start',
            flex: 1,
          }}
        >
          {/* LEFT: VerticalPipeline (40%) */}
          <div style={{ flex: '0 0 40%' }}>
            <VerticalPipeline
              stages={[...DEPLOY_STAGES]}
              stageStates={stageStates}
              enterFrame={30}
            />
          </div>

          {/* RIGHT: ArnTranslationMap (55%) */}
          <div style={{ flex: '0 0 55%', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {frame >= 80 && (
              <ArnTranslationMap
                entries={visibleEntries}
                enterFrame={80}
              />
            )}

            {/* 800-1050: Stage 7 critical path - ARN morph labels */}
            {frame >= 800 && frame < 1050 && (
              <div
                style={{
                  opacity: interpolate(frame, [800, 830], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  padding: '14px 18px',
                  background: COLORS.tealDim,
                  border: `1px solid ${COLORS.borderTeal}`,
                  borderRadius: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <StatusBadge label="CRITICAL PATH" color={COLORS.teal} enterFrame={810} />
                  <span
                    style={{
                      fontSize: 13,
                      color: COLORS.teal,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Contact Flow ARN Rewriting
                  </span>
                </div>
                <ArnLabel
                  arn={SAMPLE_ARNS.lambda}
                  morphTo={TARGET_ARNS.lambda}
                  morphStartFrame={850}
                  morphDuration={60}
                  enterFrame={820}
                  fontSize={10}
                />
                <ArnLabel
                  arn={SAMPLE_ARNS.lex}
                  morphTo={TARGET_ARNS.lex}
                  morphStartFrame={880}
                  morphDuration={60}
                  enterFrame={840}
                  fontSize={10}
                />
                <ArnLabel
                  arn={SAMPLE_ARNS.flow}
                  morphTo={TARGET_ARNS.flow}
                  morphStartFrame={920}
                  morphDuration={60}
                  enterFrame={860}
                  fontSize={10}
                />
              </div>
            )}

            {/* 580-700: Queue callout */}
            {frame >= 580 && frame < 800 && (
              <div
                style={{
                  opacity: queueCalloutOpacity,
                  padding: '10px 16px',
                  background: COLORS.tealDim,
                  border: `1px solid ${COLORS.borderTeal}`,
                  borderRadius: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: COLORS.teal,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Hours ARN inside queue? Already mapped!
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 1050-1250: Resilience demo */}
      {frame >= 1050 && frame < 1250 && (
        <div
          style={{
            opacity: resilienceOpacity,
            display: 'flex',
            gap: 40,
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flex: '0 0 40%' }}>
            <VerticalPipeline
              stages={[...DEPLOY_STAGES]}
              stageStates={stageStates}
              enterFrame={1050}
            />
          </div>
          <div style={{ flex: '0 0 55%' }}>
            <GlassCard enterFrame={1060} padding={28} glowColor="rgba(255,61,0,0.2)">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Partial success beats total failure
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: COLORS.textSecondary,
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  Stage 4 (Prompts) failed — but stages 5, 6, and 7 continued. The pipeline
                  keeps going. You get everything except what genuinely couldn't be re-created.
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
                  <StatusBadge label="6 STAGES OK" color={COLORS.green} enterFrame={1070} />
                  <StatusBadge label="1 STAGE FAILED" color={COLORS.red} enterFrame={1085} />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* 1250-1400: Deployment Complete */}
      {frame >= 1250 && (
        <div
          style={{
            opacity: completeOpacity,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          <ParticleBurst
            triggerFrame={1300}
            x={960}
            y={400}
            count={28}
            colors={[COLORS.teal, COLORS.green, COLORS.tealLight]}
          />
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.teal,
              fontFamily: "'Inter', sans-serif",
              textAlign: 'center',
              textShadow: `0 0 40px ${COLORS.tealGlow}`,
            }}
          >
            Deployment Complete
          </div>
          <div
            style={{
              fontSize: 18,
              color: COLORS.textSecondary,
              fontFamily: "'Inter', sans-serif",
              textAlign: 'center',
            }}
          >
            All 7 stages executed · ARNs translated · Resources live in target account
          </div>
          <StatusBadge label="SUCCESS" color={COLORS.green} enterFrame={1260} />
        </div>
      )}
    </AbsoluteFill>
  );
};
