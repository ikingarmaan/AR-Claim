import React from 'react';
import { ClaimyMascot, ClaimyMood } from './ClaimyMascot';

interface CartoonTipProps {
  mood?: ClaimyMood;
  type?: 'green-tip' | 'red-warning' | 'info';
  title?: string;
  message: string;
  className?: string;
}

export const CartoonTip: React.FC<CartoonTipProps> = ({
  mood = 'happy',
  type = 'green-tip',
  title,
  message,
  className = '',
}) => {
  const isRed = type === 'red-warning' || mood === 'denied';
  const isGreen = type === 'green-tip' || mood === 'celebrating';

  return (
    <div
      className={`p-4 rounded-2xl bg-white border-2 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm transition-all ${
        isRed
          ? 'border-red-200 ring-2 ring-red-100 hover:border-red-400'
          : isGreen
          ? 'border-emerald-200 ring-2 ring-emerald-100 hover:border-emerald-400'
          : 'border-slate-200 hover:border-blue-300'
      } ${className}`}
    >
      <div className="shrink-0">
        <ClaimyMascot mood={mood} size="sm" interactive />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
          <span
            className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isRed
                ? 'bg-red-100 text-red-700 border border-red-200'
                : isGreen
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}
          >
            {isRed ? '🚨 Claimy Warning' : isGreen ? '✅ Claimy Pro-Tip' : '💡 Claimy Note'}
          </span>
          {title && (
            <h4 className="font-extrabold text-xs text-slate-900">{title}</h4>
          )}
        </div>

        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};
