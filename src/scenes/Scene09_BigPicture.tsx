import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FLOW_TIERS, SPRING_CONFIG, SPRING_FAST } from '../theme/constants';
import { GlowOrb } from '../components/backgrounds/GlowOrb';
import { Checkmark } from '../components/ui/Checkmark';
import { StatusBadge } from '../components/ui/StatusBadge';
import { AccountBox } from '../components/diagrams/AccountBox';

// A small spring-based box element for the architecture diagram
interface DiagramNodeProps {
  label: string;
  sublabel?: string;
  enterFrame: number;
  color?: string;
  style?: React.CSSProperties;
}

const DiagramNode: React.FC<DiagramNodeProps> = ({
  label,
  sublabel,
  enterFrame,
  color = COLORS.teal,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - enterFrame, fps, config: SPRING_FAST });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.85, 1]);

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        padding: '10px 18px',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${color}55`,
        borderRadius: 10,
        textAlign: 'center',
        ...style,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "'Inter', sans-serif" }}>
        {label}
      </div>
      {sublabel && (
        <div style={{ fontSize: 10, color: COLORS.textDim, fontFamily: "'Inter', sans-serif", marginTop: 3 }}>
          {sublabel}
        </div>
      )}
    </div>
  );
};

// Simple SVG arrow between two points (static, opacity controlled externally)
interface DiagArrowProps {
  x1: number; y1: number; x2: number; y2: number;
  color?: string;
  opacity?: number;
}
const DiagArrow: React.FC<DiagArrowProps> = ({ x1, y1, x2, y2, color = COLORS.teal, opacity = 1 }) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const arrowSize = 7;
  return (
    <svg
      style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity }}
    >
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.6} />
      <polygon
        points={`${x2},${y2} ${x2 - arrowSize * Math.cos(angle - 0.4)},${y2 - arrowSize * Math.sin(angle - 0.4)} ${x2 - arrowSize * Math.cos(angle + 0.4)},${y2 - arrowSize * Math.sin(angle + 0.4)}`}
        fill={color}
        opacity={0.6}
      />
    </svg>
  );
};

export const Scene09_BigPicture: React.FC = () => {
  const frame = useCurrentFrame();

  // Exit fade to black: 700-750
  const exitOpacity = interpolate(frame, [700, 750], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 0-30: Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Architecture diagram arrows appear at ~80 frames
  const arrowOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 300-500: Flow tier cards
  const tierOpacity = interpolate(frame, [300, 330], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 500-620: Roadmap
  const roadmapOpacity = interpolate(frame, [500, 530], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 620-700: Closing tagline
  const taglineOpacity = interpolate(frame, [620, 650], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const todayItems = [
    'Manual pipeline',
    'S3 artifacts',
    'Full ARN translation',
    'Cross-account deploy',
    '3-tier flows',
    'Resilient deploy',
  ];

  const comingItems = [
    'EventBridge auto-trigger',
    'Git-backed versioning',
    'CI/CD pipeline',
  ];

  return (
    <AbsoluteFill style={{ padding: 60, opacity: exitOpacity }}>
      <GlowOrb x={100} y={100} color="rgba(0,212,170,0.04)" size={500} />
      <GlowOrb x={1600} y={700} color="rgba(68,138,255,0.03)" size={420} />

      {/* 0-30: Title */}
      <div style={{ opacity: titleOpacity, marginBottom: 28 }}>
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
          THE FULL PICTURE
        </span>
      </div>

      {/* 30-300: Architecture diagram */}
      {frame >= 30 && frame < 500 && (
        <div style={{ position: 'relative', height: 340, marginBottom: 20 }}>
          {/* SVG arrows */}
          <DiagArrow x1={85} y1={65} x2={200} y2={65} opacity={arrowOpacity} color={COLORS.teal} />
          <DiagArrow x1={340} y1={65} x2={450} y2={65} opacity={arrowOpacity} color={COLORS.teal} />
          <DiagArrow x1={550} y1={90} x2={220} y2={170} opacity={arrowOpacity} color={COLORS.textDim} />
          <DiagArrow x1={550} y1={90} x2={480} y2={170} opacity={arrowOpacity} color={COLORS.textDim} />
          <DiagArrow x1={550} y1={90} x2={720} y2={170} opacity={arrowOpacity} color={COLORS.textDim} />
          <DiagArrow x1={220} y1={215} x2={160} y2={290} opacity={arrowOpacity} color={COLORS.blue} />
          <DiagArrow x1={480} y1={215} x2={560} y2={290} opacity={arrowOpacity} color={COLORS.green} />

          {/* Row 1: Operator → React UI → Spring Boot */}
          <div style={{ position: 'absolute', top: 40, left: 0, display: 'flex', alignItems: 'center', gap: 0 }}>
            <DiagramNode label="Operator" enterFrame={30} color={COLORS.textSecondary} style={{ minWidth: 90 }} />
            <DiagramNode label="React Web UI" sublabel="localhost:5173" enterFrame={50} color={COLORS.blue} style={{ marginLeft: 120, minWidth: 140 }} />
            <DiagramNode label="Spring Boot" sublabel=":8080" enterFrame={70} color={COLORS.teal} style={{ marginLeft: 120, minWidth: 130 }} />
          </div>

          {/* Row 2: S3 + DynamoDB + STS */}
          <div style={{ position: 'absolute', top: 155, left: 0, display: 'flex', gap: 40 }}>
            <DiagramNode label="S3 Snapshots" enterFrame={90} color={COLORS.orange} style={{ minWidth: 140 }} />
            <DiagramNode label="DynamoDB Manifest" enterFrame={105} color={COLORS.purple} style={{ minWidth: 160 }} />
            <DiagramNode label="STS AssumeRole" enterFrame={120} color={COLORS.amber} style={{ minWidth: 150 }} />
          </div>

          {/* Row 3: SOURCE + TARGET AccountBoxes */}
          <div style={{ position: 'absolute', top: 260, left: 0, display: 'flex', gap: 60 }}>
            <AccountBox
              label="SOURCE"
              accountId="111111111111"
              color={COLORS.blue}
              enterFrame={140}
              width={250}
            />
            <AccountBox
              label="TARGET"
              accountId="222222222222"
              color={COLORS.green}
              enterFrame={155}
              width={280}
            >
              {frame >= 170 && (
                <div
                  style={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    opacity: interpolate(frame, [170, 190], [0, 1], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }),
                  }}
                >
                  {['New Connect Instance', 'Re-created Resources', 'Translated ARNs'].map((t) => (
                    <div key={t} style={{ fontSize: 10, color: COLORS.green, fontFamily: "'Inter', sans-serif" }}>
                      ✓ {t}
                    </div>
                  ))}
                </div>
              )}
            </AccountBox>
          </div>
        </div>
      )}

      {/* 300-500: Three FLOW_TIERS cards */}
      {frame >= 300 && frame < 620 && (
        <div style={{ opacity: tierOpacity, display: 'flex', gap: 24, marginBottom: 28 }}>
          {FLOW_TIERS.map((tier, i) => {
            const cardProgress = spring({
              frame: frame - (300 + i * 25),
              fps: 30,
              config: SPRING_CONFIG,
            });
            const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
            const cardScale = interpolate(cardProgress, [0, 1], [0.88, 1]);

            if (frame < 300 + i * 25) return null;

            return (
              <div
                key={tier.id}
                style={{
                  flex: 1,
                  padding: '20px 24px',
                  background: `${tier.color}0d`,
                  border: `1px solid ${tier.color}55`,
                  borderRadius: 12,
                  opacity: cardOpacity,
                  transform: `scale(${cardScale})`,
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: tier.color, fontFamily: "'Inter', sans-serif", marginBottom: 6 }}>
                  {tier.label}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textSecondary, fontFamily: "'Inter', sans-serif" }}>
                  {tier.desc}
                </div>
                <StatusBadge label={tier.id.toUpperCase()} color={tier.color} enterFrame={310 + i * 25} style={{ marginTop: 12 }} />
              </div>
            );
          })}
        </div>
      )}

      {/* 500-620: Roadmap two-column */}
      {frame >= 500 && frame < 700 && (
        <div style={{ opacity: roadmapOpacity, display: 'flex', gap: 40 }}>
          {/* TODAY */}
          <div
            style={{
              flex: 1,
              padding: '18px 22px',
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: COLORS.teal,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: 1,
                textTransform: 'uppercase' as const,
                marginBottom: 14,
              }}
            >
              TODAY
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {todayItems.map((item, i) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Checkmark
                    triggerFrame={510 + i * 10}
                    size={16}
                    color={COLORS.green}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      color: COLORS.textPrimary,
                      fontFamily: "'Inter', sans-serif",
                      opacity: frame >= 510 + i * 10
                        ? interpolate(frame, [510 + i * 10, 525 + i * 10], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                          })
                        : 0,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* COMING NEXT */}
          <div
            style={{
              flex: 1,
              padding: '18px 22px',
              background: COLORS.bgCard,
              border: `1px solid ${COLORS.amber}33`,
              borderRadius: 12,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: COLORS.amber,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: 1,
                textTransform: 'uppercase' as const,
                marginBottom: 14,
              }}
            >
              COMING NEXT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {comingItems.map((item, i) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      border: `2px solid ${COLORS.amber}`,
                      borderRadius: 3,
                      flexShrink: 0,
                      opacity: frame >= 560 + i * 12
                        ? interpolate(frame, [560 + i * 12, 575 + i * 12], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                          })
                        : 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      color: COLORS.textSecondary,
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: 'italic',
                      opacity: frame >= 560 + i * 12
                        ? interpolate(frame, [560 + i * 12, 575 + i * 12], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                          })
                        : 0,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 620-700: Closing tagline */}
      {frame >= 620 && (
        <div
          style={{
            opacity: taglineOpacity,
            position: 'absolute',
            bottom: 80,
            left: 60,
            right: 60,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: COLORS.teal,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: -1,
              textShadow: `0 0 30px ${COLORS.tealGlow}`,
              marginBottom: 12,
            }}
          >
            Extract. Package. Deploy.
          </div>
          <div
            style={{
              fontSize: 18,
              color: COLORS.textSecondary,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: 0.5,
            }}
          >
            Full ARN Translation. Cross-Account. Resilient.
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
