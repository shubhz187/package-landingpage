import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, SPRING_CONFIG, FLOW_TIERS } from '../../theme/constants';

interface WebUIMockupProps {
  enterFrame?: number;
  formFillFrame?: number; // when form fields start filling
  buttonClickFrame?: number; // when button glows
  style?: React.CSSProperties;
}

const FORM_FIELDS = [
  { label: 'Instance ID', value: 'i-183babc4-ab9e-458e-96e0' },
  { label: 'Contact Flow ID', value: '6c0921ae-2f38-4b19-a830' },
  { label: 'Environment', value: 'production' },
  { label: 'Updated By', value: 'devops-team@company.com' },
];

// Typewriter: reveal characters up to the proportion of fill progress
const typewriterText = (text: string, progress: number): string => {
  const chars = Math.floor(progress * text.length);
  return text.slice(0, chars);
};

export const WebUIMockup: React.FC<WebUIMockupProps> = ({
  enterFrame = 0,
  formFillFrame,
  buttonClickFrame,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring enter for the whole mockup
  const enterProgress = spring({
    frame: frame - enterFrame,
    fps,
    config: SPRING_CONFIG,
  });

  const mockupOpacity = interpolate(enterProgress, [0, 1], [0, 1]);
  const mockupY = interpolate(enterProgress, [0, 1], [24, 0]);
  const mockupScale = interpolate(enterProgress, [0, 1], [0.92, 1]);

  // Button glow
  const buttonGlow =
    buttonClickFrame !== undefined && frame >= buttonClickFrame
      ? interpolate(
          frame,
          [buttonClickFrame, buttonClickFrame + 20, buttonClickFrame + 60],
          [0, 1, 0.6],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
      : 0;

  if (frame < enterFrame) return null;

  return (
    <div
      style={{
        opacity: mockupOpacity,
        transform: `translateY(${mockupY}px) scale(${mockupScale})`,
        transformOrigin: 'top center',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
        border: `1px solid ${COLORS.border}`,
        ...style,
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: '#1e293b',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        {/* Traffic light dots */}
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            background: '#0f172a',
            borderRadius: 4,
            padding: '3px 10px',
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            color: COLORS.textSecondary,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          localhost:5173/extract
        </div>
      </div>

      {/* Page content */}
      <div
        style={{
          background: '#f1f5f9',
          padding: 20,
          minHeight: 280,
        }}
      >
        {/* Page title */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: 14,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Extract Configuration
        </div>

        {/* Flow tier cards */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          {FLOW_TIERS.map((tier) => (
            <div
              key={tier.id}
              style={{
                flex: 1,
                padding: '10px 12px',
                background: '#fff',
                border: `2px solid ${tier.color}`,
                borderRadius: 8,
                boxShadow: `0 0 0 1px ${tier.color}30`,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: tier.color,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {tier.label}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: '#64748b',
                  marginTop: 2,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {tier.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Form fields */}
        <div
          style={{
            background: '#fff',
            borderRadius: 8,
            padding: 14,
            border: '1px solid #e2e8f0',
            marginBottom: 14,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {FORM_FIELDS.map((field, index) => {
              const fieldFillFrame = formFillFrame
                ? formFillFrame + index * 12
                : undefined;

              const fillProgress =
                fieldFillFrame !== undefined && frame >= fieldFillFrame
                  ? interpolate(
                      frame,
                      [fieldFillFrame, fieldFillFrame + 20],
                      [0, 1],
                      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                    )
                  : 0;

              const displayValue =
                fillProgress > 0 ? typewriterText(field.value, fillProgress) : '';

              return (
                <div key={field.label}>
                  <div
                    style={{
                      fontSize: 10,
                      color: '#475569',
                      fontWeight: 600,
                      marginBottom: 4,
                      fontFamily: "'Inter', sans-serif",
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    {field.label}
                  </div>
                  <div
                    style={{
                      padding: '5px 8px',
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: 4,
                      fontSize: 11,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#0f172a',
                      minHeight: 24,
                    }}
                  >
                    {displayValue}
                    {fillProgress > 0 && fillProgress < 1 && (
                      <span
                        style={{
                          borderRight: '1px solid #0f172a',
                          marginLeft: 1,
                          animation: 'none',
                          opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                        }}
                      >
                        &nbsp;
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Extract button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              padding: '8px 20px',
              background: buttonGlow > 0
                ? `rgba(0, 212, 170, ${0.85 + buttonGlow * 0.15})`
                : '#3b82f6',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              color: '#fff',
              fontFamily: "'Inter', sans-serif",
              boxShadow: buttonGlow > 0
                ? `0 0 ${20 * buttonGlow}px ${COLORS.teal}, 0 0 ${40 * buttonGlow}px ${COLORS.tealGlow}`
                : '0 1px 4px rgba(59,130,246,0.4)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Extract Flow
          </div>
        </div>
      </div>
    </div>
  );
};
