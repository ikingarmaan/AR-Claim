import React, { useState } from 'react';
import { X, Calendar, Calculator, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface BirthdayRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BirthdayRuleModal: React.FC<BirthdayRuleModalProps> = ({ isOpen, onClose }) => {
  const [parentAMonth, setParentAMonth] = useState<number>(3); // March
  const [parentADay, setParentADay] = useState<number>(14);
  const [parentAYear, setParentAYear] = useState<number>(1984);
  const [parentAEffective, setParentAEffective] = useState<string>('2021-01-01');

  const [parentBMonth, setParentBMonth] = useState<number>(1); // January
  const [parentBDay, setParentBDay] = useState<number>(22);
  const [parentBYear, setParentBYear] = useState<number>(1982);
  const [parentBEffective, setParentBEffective] = useState<string>('2023-06-01');

  const [isDivorced, setIsDivorced] = useState(false);
  const [hasCourtDecree, setHasCourtDecree] = useState(false);
  const [decreeParent, setDecreeParent] = useState<'A' | 'B'>('A');

  if (!isOpen) return null;

  // Calculation logic
  let winner = 'B';
  let reason = '';

  if (isDivorced && hasCourtDecree) {
    winner = decreeParent;
    reason = `Court Decree Rule: A legally binding court order specifies Parent ${decreeParent} as responsible for healthcare coverage, which supersedes the Birthday Rule.`;
  } else if (parentAMonth < parentBMonth) {
    winner = 'A';
    reason = `Parent A's birthday month (${getMonthName(parentAMonth)}) occurs earlier in the calendar year than Parent B's (${getMonthName(parentBMonth)}). Birth years (${parentAYear} vs ${parentBYear}) are ignored!`;
  } else if (parentBMonth < parentAMonth) {
    winner = 'B';
    reason = `Parent B's birthday month (${getMonthName(parentBMonth)}) occurs earlier in the calendar year than Parent A's (${getMonthName(parentAMonth)}). Birth years (${parentAYear} vs ${parentBYear}) are ignored!`;
  } else {
    // Same month
    if (parentADay < parentBDay) {
      winner = 'A';
      reason = `Both parents share the month of ${getMonthName(parentAMonth)}, but Parent A's day (${parentADay}th) comes before Parent B's (${parentBDay}th).`;
    } else if (parentBDay < parentADay) {
      winner = 'B';
      reason = `Both parents share the month of ${getMonthName(parentBMonth)}, but Parent B's day (${parentBDay}th) comes before Parent A's (${parentADay}th).`;
    } else {
      // Exact same birthday (Month and Day) -> Longest active policy wins
      const dateA = new Date(parentAEffective).getTime();
      const dateB = new Date(parentBEffective).getTime();
      if (dateA < dateB) {
        winner = 'A';
        reason = `Tie-Breaker: Both parents have the exact same birthday (${getMonthName(parentAMonth)} ${parentADay})! Parent A's policy has been active longer (effective ${parentAEffective} vs ${parentBEffective}).`;
      } else {
        winner = 'B';
        reason = `Tie-Breaker: Both parents have the exact same birthday (${getMonthName(parentBMonth)} ${parentBDay})! Parent B's policy has been active longer (effective ${parentBEffective} vs ${parentAEffective}).`;
      }
    }
  }

  function getMonthName(m: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[m - 1] || 'Unknown';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-health-darkCard rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-health-darkSubtle/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-health-electric/10 text-health-electric border border-health-electric/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                The Birthday Rule & COB Calculator
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Determine Primary vs. Secondary payer for a dependent child
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Two Parent Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Parent A */}
            <div className={`p-4 rounded-xl border transition-all ${
              winner === 'A' 
                ? 'bg-emerald-500/10 border-emerald-500/40 ring-1 ring-emerald-500/40' 
                : 'bg-slate-50 dark:bg-health-darkSubtle/30 border-slate-200 dark:border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Parent A</span>
                {winner === 'A' && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                    PRIMARY PAYER
                  </span>
                )}
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Month & Day of Birth</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={parentAMonth}
                      onChange={e => setParentAMonth(Number(e.target.value))}
                      className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{getMonthName(i + 1)}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      value={parentADay}
                      onChange={e => setParentADay(Number(e.target.value))}
                      className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Birth Year (Ignored)</label>
                    <input
                      type="number"
                      value={parentAYear}
                      onChange={e => setParentAYear(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Policy Effective</label>
                    <input
                      type="date"
                      value={parentAEffective}
                      onChange={e => setParentAEffective(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Parent B */}
            <div className={`p-4 rounded-xl border transition-all ${
              winner === 'B' 
                ? 'bg-emerald-500/10 border-emerald-500/40 ring-1 ring-emerald-500/40' 
                : 'bg-slate-50 dark:bg-health-darkSubtle/30 border-slate-200 dark:border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Parent B</span>
                {winner === 'B' && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                    PRIMARY PAYER
                  </span>
                )}
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Month & Day of Birth</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={parentBMonth}
                      onChange={e => setParentBMonth(Number(e.target.value))}
                      className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{getMonthName(i + 1)}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min={1}
                      max={31}
                      value={parentBDay}
                      onChange={e => setParentBDay(Number(e.target.value))}
                      className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Birth Year (Ignored)</label>
                    <input
                      type="number"
                      value={parentBYear}
                      onChange={e => setParentBYear(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Policy Effective</label>
                    <input
                      type="date"
                      value={parentBEffective}
                      onChange={e => setParentBEffective(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legal / Divorce Options */}
          <div className="bg-slate-50 dark:bg-health-darkSubtle/20 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="divorceCheck"
                checked={isDivorced}
                onChange={e => setIsDivorced(e.target.checked)}
                className="rounded border-slate-300 text-health-electric"
              />
              <label htmlFor="divorceCheck" className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                Parents are Divorced / Separated (Court Decree Exception)
              </label>
            </div>

            {isDivorced && (
              <div className="pl-6 pt-2 border-l-2 border-health-electric/40 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="decreeCheck"
                    checked={hasCourtDecree}
                    onChange={e => setHasCourtDecree(e.target.checked)}
                    className="rounded border-slate-300 text-health-electric"
                  />
                  <label htmlFor="decreeCheck" className="text-slate-700 dark:text-slate-300 cursor-pointer">
                    A formal court decree exists stating healthcare financial responsibility
                  </label>
                </div>

                {hasCourtDecree && (
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-slate-500">Designated Parent:</span>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="decreeParent"
                        checked={decreeParent === 'A'}
                        onChange={() => setDecreeParent('A')}
                      />
                      Parent A
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="decreeParent"
                        checked={decreeParent === 'B'}
                        onChange={() => setDecreeParent('B')}
                      />
                      Parent B
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Adjudication Result Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-health-electric/10 to-emerald-500/10 border border-health-electric/30">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Determination: Parent {winner} is PRIMARY ({winner === 'A' ? 'Parent B' : 'Parent A'} is SECONDARY)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {reason}
            </p>
          </div>

          {/* RCM Pro-Tip */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">AR Compliance Tip: </span>
              Submitting claims in reverse COB order causes immediate CARC CO-22 denials. Always bill Parent {winner} first, post the primary remittance (835), then submit the balance to the secondary payer with primary EOB attached!
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-health-darkSubtle/30 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
