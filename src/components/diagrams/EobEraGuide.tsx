import React, { useState } from 'react';

export const EobEraGuide: React.FC = () => {
  const [billed, setBilled] = useState<number>(450);
  const [allowed, setAllowed] = useState<number>(280);
  const [deductible, setDeductible] = useState<number>(50);
  const [coinsurancePct, setCoinsurancePct] = useState<number>(20); // 20%

  // Calculations
  const co45 = Math.max(0, billed - allowed);
  const afterDeductible = Math.max(0, allowed - deductible);
  const coinsuranceAmt = Math.round((afterDeductible * coinsurancePct) / 100);
  const payerPaid = Math.max(0, afterDeductible - coinsuranceAmt);
  const totalPatientResponsibility = deductible + coinsuranceAmt;

  return (
    <div className="skeuo-paper p-5 sm:p-7 rounded-xl border border-stone-300 dark:border-stone-700 shadow-skeuo-raised mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-dashed border-stone-300 dark:border-stone-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-300 dark:border-emerald-700">
              Interactive Accounting Calculator
            </span>
            <span className="text-xs font-mono text-stone-500">EDI-835-ERA-LEDGER</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            EOB / ERA (835) Adjudication Anatomy & Math Ledger
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Every remittance advice must balance to zero. Experiment with the sliders below to see how charges split between adjustments, patient responsibility, and payment.
          </p>
        </div>

        <div className="skeuo-stamp-approved text-xs px-2.5 py-1 font-mono uppercase">
          EFT #ACH-98214 BALANCED
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 my-5 p-4 rounded-lg bg-stone-100 dark:bg-stone-900/60 border border-stone-300 dark:border-stone-700 text-xs">
        <div>
          <label className="font-mono font-bold text-stone-700 dark:text-stone-300 block mb-1">
            Billed Charge: ${billed}
          </label>
          <input
            type="range"
            min="100"
            max="1000"
            step="25"
            value={billed}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBilled(val);
              if (allowed > val) setAllowed(val);
            }}
            className="w-full accent-amber-600"
          />
        </div>

        <div>
          <label className="font-mono font-bold text-stone-700 dark:text-stone-300 block mb-1">
            Contracted Allowed: ${allowed}
          </label>
          <input
            type="range"
            min="50"
            max={billed}
            step="10"
            value={allowed}
            onChange={(e) => setAllowed(Number(e.target.value))}
            className="w-full accent-amber-600"
          />
        </div>

        <div>
          <label className="font-mono font-bold text-stone-700 dark:text-stone-300 block mb-1">
            Deductible (PR-1): ${deductible}
          </label>
          <input
            type="range"
            min="0"
            max={allowed}
            step="10"
            value={deductible}
            onChange={(e) => setDeductible(Number(e.target.value))}
            className="w-full accent-amber-600"
          />
        </div>

        <div>
          <label className="font-mono font-bold text-stone-700 dark:text-stone-300 block mb-1">
            Coinsurance (PR-2): {coinsurancePct}%
          </label>
          <input
            type="range"
            min="0"
            max="50"
            step="5"
            value={coinsurancePct}
            onChange={(e) => setCoinsurancePct(Number(e.target.value))}
            className="w-full accent-amber-600"
          />
        </div>
      </div>

      {/* The Physical Skeuomorphic Check & Remittance Voucher */}
      <div className="skeuo-manila p-5 sm:p-6 rounded-xl border border-stone-400 dark:border-stone-600 shadow-md">
        {/* Payer Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-400/60 dark:border-stone-600/60">
          <div>
            <div className="text-xs font-mono font-bold text-stone-700 uppercase">PAYER REMITTANCE ADVICE (835)</div>
            <div className="text-base font-serif font-bold text-stone-900">BLUE CROSS BLUE SHIELD HEALTHCARE</div>
            <div className="text-xs font-mono text-stone-600">CLAIM ICN: 2026-088194-01 | CHECK TRACE: #ACH-98214</div>
          </div>
          <div className="text-right mt-2 sm:mt-0">
            <div className="text-xs font-mono text-stone-600">DATE ISSUED: OCT 18, 2026</div>
            <div className="text-lg font-mono font-bold text-emerald-800">
              NET EFT PAID: ${payerPaid.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-stone-400 text-stone-800 text-left">
                <th className="py-2">SERVICE / CPT</th>
                <th className="py-2 text-right">BILLED</th>
                <th className="py-2 text-right">ALLOWED</th>
                <th className="py-2 text-right">CO-45 WRITE-OFF</th>
                <th className="py-2 text-right">PR-1 DEDUCTIBLE</th>
                <th className="py-2 text-right">PR-2 COINS ({coinsurancePct}%)</th>
                <th className="py-2 text-right font-bold text-emerald-900">PAYER PAID</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stone-300">
                <td className="py-3 font-serif font-bold text-stone-900">99214 — Office Visit L4</td>
                <td className="py-3 text-right text-stone-900">${billed.toFixed(2)}</td>
                <td className="py-3 text-right text-blue-900 font-bold">${allowed.toFixed(2)}</td>
                <td className="py-3 text-right text-red-800 font-bold">-${co45.toFixed(2)}</td>
                <td className="py-3 text-right text-amber-900 font-bold">${deductible.toFixed(2)}</td>
                <td className="py-3 text-right text-amber-900 font-bold">${coinsuranceAmt.toFixed(2)}</td>
                <td className="py-3 text-right font-bold text-emerald-800 text-sm">${payerPaid.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Accounting Equation Verification Box */}
        <div className="mt-4 p-3 bg-stone-200/80 dark:bg-stone-800/80 rounded border border-stone-400 dark:border-stone-600 text-xs font-mono">
          <div className="text-stone-800 dark:text-stone-200 font-bold mb-1">
            THE REVENUE CYCLE BALANCING FORMULA:
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-stone-700 dark:text-stone-300">
            <span>Billed (${billed})</span>
            <span>=</span>
            <span className="text-red-700 font-bold">Contractual Adj (${co45})</span>
            <span>+</span>
            <span className="text-amber-700 font-bold">Patient Resp (${totalPatientResponsibility})</span>
            <span>+</span>
            <span className="text-emerald-700 font-bold">Payer Paid (${payerPaid})</span>
            <span className="ml-auto text-emerald-700 font-bold">✓ BALANCE = $0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
