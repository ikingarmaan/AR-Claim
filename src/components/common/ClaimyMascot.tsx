import React from 'react';
import { motion } from 'framer-motion';

export type ClaimyMood = 'happy' | 'thinking' | 'scrubbing' | 'denied' | 'celebrating' | 'calling' | 'reading';

interface ClaimyMascotProps {
  mood?: ClaimyMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSpeechBubble?: boolean;
  bubbleText?: string;
  className?: string;
  interactive?: boolean;
}

export const ClaimyMascot: React.FC<ClaimyMascotProps> = ({
  mood = 'happy',
  size = 'md',
  showSpeechBubble = false,
  bubbleText,
  className = '',
  interactive = true,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  // State colors
  const isDenied = mood === 'denied';
  const isCelebrating = mood === 'celebrating';
  const isScrubbing = mood === 'scrubbing';

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      {/* Animated Cartoon SVG Character */}
      <motion.div
        className={`${sizeMap[size]} relative shrink-0 cursor-pointer select-none`}
        whileHover={interactive ? { scale: 1.08, rotate: [0, -3, 3, 0] } : undefined}
        whileTap={interactive ? { scale: 0.95 } : undefined}
        animate={{
          y: isCelebrating ? [0, -8, 0] : isDenied ? [0, 2, 0] : [0, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: isCelebrating ? 1.5 : 3,
          ease: 'easeInOut',
        }}
      >
        <svg
          viewBox="0 0 160 180"
          className="w-full h-full drop-shadow-md overflow-visible"
        >
          {/* Shadow underneath */}
          <ellipse cx="80" cy="172" rx="42" ry="7" fill="rgba(0,0,0,0.12)" />

          {/* Body: Animated Form / Document */}
          <rect
            x="28"
            y="20"
            width="104"
            height="140"
            rx="18"
            fill="#FFFFFF"
            stroke={isDenied ? '#EF4444' : isCelebrating || isScrubbing ? '#10B981' : '#0284C7'}
            strokeWidth="5"
          />

          {/* Form Header Red/Green Stripe */}
          <path
            d="M 28 38 Q 80 40 132 38 L 132 20 Q 80 20 28 20 Z"
            fill={isDenied ? '#F87171' : isCelebrating ? '#34D399' : '#38BDF8'}
            opacity="0.9"
            clipPath="url(#bodyClip)"
          />

          {/* Form Header Dots & Lines */}
          <rect x="42" y="27" width="22" height="4" rx="2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="118" cy="29" r="3" fill="#FFFFFF" />

          {/* Medical Red Cross or Green Checkmark on upper left */}
          <g transform="translate(38, 48)">
            {isDenied ? (
              // Red Rejection Warning Icon
              <g>
                <circle cx="10" cy="10" r="10" fill="#EF4444" />
                <path d="M6 6 L14 14 M14 6 L6 14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            ) : isCelebrating ? (
              // Green Paid Checkmark Icon
              <g>
                <circle cx="10" cy="10" r="10" fill="#10B981" />
                <path d="M5 10 L8.5 13.5 L15 6.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ) : (
              // Blue Medical Cross
              <g>
                <circle cx="10" cy="10" r="10" fill="#0284C7" />
                <rect x="8" y="4" width="4" height="12" rx="1.5" fill="#FFFFFF" />
                <rect x="4" y="8" width="12" height="4" rx="1.5" fill="#FFFFFF" />
              </g>
            )}
          </g>

          {/* Document Content Lines (Simulating claim boxes) */}
          <rect x="64" y="48" width="54" height="5" rx="2.5" fill="#E2E8F0" />
          <rect x="64" y="58" width="36" height="4" rx="2" fill="#CBD5E1" />

          {/* Big Cute Cartoon Eyes */}
          <g transform="translate(0, 10)">
            {/* Left Eye */}
            <ellipse cx="62" cy="80" rx="9" ry="12" fill="#1E293B" />
            <ellipse cx="60" cy="76" rx="3.5" ry="5" fill="#FFFFFF" />
            <circle cx="65" cy="84" r="1.5" fill="#FFFFFF" />

            {/* Right Eye */}
            <ellipse cx="98" cy="80" rx="9" ry="12" fill="#1E293B" />
            <ellipse cx="96" cy="76" rx="3.5" ry="5" fill="#FFFFFF" />
            <circle cx="101" cy="84" r="1.5" fill="#FFFFFF" />

            {/* Eyebrows */}
            {isDenied ? (
              // Worried Eyebrows
              <g stroke="#64748B" strokeWidth="3" strokeLinecap="round" fill="none">
                <path d="M54 66 Q62 62 70 68" />
                <path d="M90 68 Q98 62 106 66" />
              </g>
            ) : (
              // Cheerful Eyebrows
              <g stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" fill="none">
                <path d="M54 65 Q62 60 70 64" />
                <path d="M90 64 Q98 60 106 65" />
              </g>
            )}

            {/* Rosy Cheeks */}
            <circle cx="50" cy="88" r="6" fill="#FDA4AF" opacity="0.6" />
            <circle cx="110" cy="88" r="6" fill="#FDA4AF" opacity="0.6" />

            {/* Cartoon Mouth */}
            {isDenied ? (
              // Cute 'Ooh no' Wobbly Mouth
              <path
                d="M72 102 Q80 96 88 102"
                stroke="#1E293B"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            ) : isCelebrating ? (
              // Big Happy Open Smile with Tongue
              <g>
                <path
                  d="M68 96 Q80 114 92 96 Z"
                  fill="#E11D48"
                  stroke="#1E293B"
                  strokeWidth="2.5"
                />
                <path
                  d="M74 104 Q80 108 86 104 Z"
                  fill="#FB7185"
                />
              </g>
            ) : (
              // Friendly Smile
              <path
                d="M71 96 Q80 106 89 96"
                stroke="#1E293B"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>

          {/* Stethoscope around neck */}
          <g>
            <path
              d="M 38 100 C 38 135, 122 135, 122 100"
              fill="none"
              stroke="#0284C7"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Bell of Stethoscope */}
            <circle cx="80" cy="130" r="7" fill="#0369A1" stroke="#BAE6FD" strokeWidth="2" />
          </g>

          {/* Bandage if Denied */}
          {isDenied && (
            <g transform="translate(100, 30) rotate(25)">
              <rect x="0" y="0" width="22" height="9" rx="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
              <circle cx="11" cy="4.5" r="1.5" fill="#D97706" />
            </g>
          )}

          {/* Red Stamp if Denied */}
          {isDenied && (
            <g transform="translate(54, 118) rotate(-10)">
              <rect x="0" y="0" width="52" height="18" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
              <text x="26" y="13" fill="#DC2626" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                DENIED!
              </text>
            </g>
          )}

          {/* Green Stamp if Celebrating */}
          {isCelebrating && (
            <g transform="translate(54, 116) rotate(-8)">
              <rect x="0" y="0" width="54" height="20" rx="4" fill="#D1FAE5" stroke="#059669" strokeWidth="2.5" />
              <text x="27" y="14" fill="#059669" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                PAID: $150
              </text>
            </g>
          )}

          {/* Cute Little Sneakers / Feet */}
          <g transform="translate(0, 150)">
            {/* Left Shoe */}
            <ellipse cx="62" cy="16" rx="14" ry="7" fill="#2563EB" />
            <ellipse cx="60" cy="14" rx="12" ry="5" fill="#3B82F6" />
            <path d="M50 18 Q62 20 74 18" stroke="#FFFFFF" strokeWidth="2" />

            {/* Right Shoe */}
            <ellipse cx="98" cy="16" rx="14" ry="7" fill="#2563EB" />
            <ellipse cx="96" cy="14" rx="12" ry="5" fill="#3B82F6" />
            <path d="M86 18 Q98 20 110 18" stroke="#FFFFFF" strokeWidth="2" />
          </g>

          {/* Arms / Hands */}
          {isCelebrating ? (
            // Hands in the air celebrating!
            <g>
              <path d="M 28 85 Q 12 60 18 45" fill="none" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
              <circle cx="18" cy="45" r="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
              <path d="M 132 85 Q 148 60 142 45" fill="none" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
              <circle cx="142" cy="45" r="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
            </g>
          ) : isDenied ? (
            // Arms holding head / cheeks
            <g>
              <path d="M 28 95 Q 18 80 34 76" fill="none" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
              <circle cx="34" cy="76" r="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
              <path d="M 132 95 Q 142 80 126 76" fill="none" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
              <circle cx="126" cy="76" r="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
            </g>
          ) : (
            // Waving Hand
            <g>
              <path d="M 28 95 Q 12 85 16 75" fill="none" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
              <circle cx="16" cy="75" r="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
              <path d="M 132 95 Q 148 85 144 75" fill="none" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
              <circle cx="144" cy="75" r="6" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
            </g>
          )}
        </svg>
      </motion.div>

      {/* Speech Bubble */}
      {showSpeechBubble && bubbleText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -6 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="relative bg-white border-2 border-slate-200 rounded-2xl p-3.5 shadow-md max-w-xs text-xs text-slate-800"
        >
          {/* Arrow */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-3 bg-white border-l-2 border-b-2 border-slate-200 rotate-45" />
          <div className="font-extrabold text-[11px] uppercase tracking-wider text-emerald-600 mb-0.5 flex items-center gap-1">
            <span>Doc Claimy</span>
            <span className="text-[10px] text-slate-400 font-normal">• RCM Buddy</span>
          </div>
          <p className="leading-relaxed font-medium">{bubbleText}</p>
        </motion.div>
      )}
    </div>
  );
};
