import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { RcmPipelineFlow } from '../diagrams/RcmPipelineFlow';
import { 
  DollarSign, 
  Calculator, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  Receipt,
  FileSpreadsheet,
  AlertOctagon,
  Percent
} from 'lucide-react';

export const Stage7ChargeCapturing: React.FC = () => {
  const { setActiveModule, markModuleCompleted, progress } = useAcademy();
  const isCompleted = progress.completedModules.includes('charge-capture');

  const [activeTab, setActiveTab] = useState<'superbill' | 'cdm' | 'rbrvs' | 'scrubbing'>('superbill');

  // Interactive RBRVS calculator state
  const [wrvu, setWrvu] = useState<number>(2.43); // 99214 work RVU
  const [pervu, setPervu] = useState<number>(1.48); // PE RVU
  const [mprvu, setMprvu] = useState<number>(0.12); // MP RVU
  const cf = 33.2875; // 2026 CMS Conversion Factor estimate

  const totalRvu = wrvu + pervu + mprvu;
  const estimatedMedicareReimbursement = totalRvu * cf;

  return (
    <div className="space-y-8 animate-fadeIn">
      <RcmPipelineFlow />

      <div className="skeuo-manila p-6 sm:p-8 rounded-xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised relative">
        {/* Binder Clip */}
        <div className="absolute -top-4 left-10 w-16 h-8 bg-gradient-to-b from-stone-400 to-stone-600 rounded-t-md shadow-md border border-stone-500 flex items-center justify-center">
          <div className="w-12 h-1.5 bg-stone-300 rounded-full" />
        </div>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
          <div>
            <div className="flex items-center gap-2">
              <span className="skeuo-badge bg-orange-700 text-white font-mono text-xs px-2.5 py-1 rounded">
                GATE 7 OF 10: MID-CYCLE
              </span>
              <span className="text-xs font-mono text-stone-600 dark:text-stone-300">
                SUPERBILL • CHARGEMASTER (CDM) • RBRVS FEE SCHEDULES
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
              Stage 7: Charge Capturing & Fee Schedules
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 mt-1 max-w-3xl leading-relaxed">
              Charge capture turns documented procedures into billable financial line items. Learn the Chargemaster (CDM), Superbill routing slips, Medicare RBRVS RVU pricing formulas, and automated claim scrubber rules.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
              CHARGES CAPTURED
            </div>
            <button
              onClick={() => markModuleCompleted('charge-capture')}
              className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 border transition-all ${
                isCompleted
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                  : 'bg-white/80 dark:bg-stone-800 border-stone-400 text-stone-700 dark:text-stone-200 hover:bg-stone-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Stage Mastered' : 'Mark Complete'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 pt-6 pb-2 border-b border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveTab('superbill')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'superbill'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🧾 The Physical Superbill / Routing Slip
          </button>
          <button
            onClick={() => setActiveTab('cdm')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'cdm'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🏛️ Hospital Chargemaster (CDM) Architecture
          </button>
          <button
            onClick={() => setActiveTab('rbrvs')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'rbrvs'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🧮 Medicare RBRVS & RVU Pricing Engine
          </button>
          <button
            onClick={() => setActiveTab('scrubbing')}
            className={`px-4 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all ${
              activeTab === 'scrubbing'
                ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 -mb-[1px] shadow-sm'
                : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            🔍 Pre-Bill Scrubbers & Missing Charge Audits
          </button>
        </div>

        {/* Tab Body */}
        <div className="py-6 bg-white dark:bg-stone-900 p-6 rounded-b-xl border-x border-b border-stone-400 dark:border-stone-600">
          {activeTab === 'superbill' && (
            <div className="space-y-6">
              <div className="skeuo-paper p-5 rounded-lg border border-stone-300 dark:border-stone-700">
                <span className="text-xs font-mono font-bold text-stone-500 uppercase">
                  PRACTICE MANAGEMENT INSTRUMENT
                </span>
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                  What is a Superbill / Fee Ticket?
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
                  A Superbill is an itemized encounter form used by medical practices reflecting the patient demographics, date of service, provider NPI, and pre-printed checkboxes of the clinic's most frequent CPT procedure codes and ICD-10 diagnosis codes.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
                  <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border">
                    <span className="font-bold text-amber-800 font-mono">1. Header Block</span>
                    <p className="text-stone-600 dark:text-stone-400 mt-1">
                      Patient legal name, DOB, insurance policy ID, account number, attending physician name & NPI, POS code (e.g. 11 = Office).
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border">
                    <span className="font-bold text-amber-800 font-mono">2. Diagnosis Checklist</span>
                    <p className="text-stone-600 dark:text-stone-400 mt-1">
                      Common ICD-10 codes checked by the provider during encounter. Coder crosswalks these into Box 21 pointers (A, B, C...).
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border">
                    <span className="font-bold text-amber-800 font-mono">3. Procedure Checklist</span>
                    <p className="text-stone-600 dark:text-stone-400 mt-1">
                      CPT codes with default units and clinic standard gross charge amounts. Coder appends modifiers and diagnostic pointer links.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cdm' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                Hospital Chargemaster (CDM) Database Anatomy
              </h4>
              <p className="leading-relaxed">
                In hospital inpatient and outpatient facilities, the Chargemaster is an enterprise catalog containing every billable item, medication, test, supply, room, and service. It typically contains 20,000+ line items.
              </p>

              <div className="overflow-x-auto mt-3">
                <table className="w-full text-xs font-mono border border-stone-300 dark:border-stone-700">
                  <thead className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100">
                    <tr>
                      <th className="p-2 border text-left">CDM Item Code</th>
                      <th className="p-2 border text-left">Dept</th>
                      <th className="p-2 border text-left">Item Description</th>
                      <th className="p-2 border text-left">Revenue Code</th>
                      <th className="p-2 border text-left">CPT / HCPCS</th>
                      <th className="p-2 border text-right">Standard Gross Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border">
                      <td className="p-2 border">CDM-04821</td>
                      <td className="p-2 border">0301 (Lab)</td>
                      <td className="p-2 border">Comprehensive Metabolic Panel</td>
                      <td className="p-2 border text-purple-700 font-bold">0301</td>
                      <td className="p-2 border">80053</td>
                      <td className="p-2 border text-right font-bold">$195.00</td>
                    </tr>
                    <tr className="border">
                      <td className="p-2 border">CDM-09124</td>
                      <td className="p-2 border">0320 (X-Ray)</td>
                      <td className="p-2 border">Chest X-Ray 2 Views PA/Lateral</td>
                      <td className="p-2 border text-purple-700 font-bold">0324</td>
                      <td className="p-2 border">71046</td>
                      <td className="p-2 border text-right font-bold">$340.00</td>
                    </tr>
                    <tr className="border">
                      <td className="p-2 border">CDM-11200</td>
                      <td className="p-2 border">0250 (Pharmacy)</td>
                      <td className="p-2 border">Ondansetron 4mg IV Injection</td>
                      <td className="p-2 border text-purple-700 font-bold">0250</td>
                      <td className="p-2 border">J2405 (per 1mg, 4 units)</td>
                      <td className="p-2 border text-right font-bold">$85.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'rbrvs' && (
            <div className="space-y-4">
              <div className="skeuo-paper p-5 rounded-lg border border-stone-300 dark:border-stone-700">
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  CMS STATUTORY PAYMENT FORMULA
                </span>
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-1">
                  Medicare Resource-Based Relative Value Scale (RBRVS)
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  Every CPT code is assigned 3 distinct Relative Value Units (RVUs) reflecting the resources required to deliver the service. Adjust the sliders below to calculate the Medicare Physician Fee Schedule (MPFS) reimbursement.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 p-4 rounded-lg bg-stone-100 dark:bg-stone-900 border text-xs">
                  <div>
                    <label className="font-mono font-bold block mb-1">
                      Work RVU (wRVU): {wrvu.toFixed(2)}
                    </label>
                    <span className="text-[10px] text-stone-500 block mb-1">Physician time, technical skill & mental effort</span>
                    <input
                      type="range"
                      min="0.5"
                      max="10.0"
                      step="0.05"
                      value={wrvu}
                      onChange={(e) => setWrvu(Number(e.target.value))}
                      className="w-full accent-amber-600"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold block mb-1">
                      Practice Expense RVU (peRVU): {pervu.toFixed(2)}
                    </label>
                    <span className="text-[10px] text-stone-500 block mb-1">Staff salaries, rent, clinical supplies & equipment</span>
                    <input
                      type="range"
                      min="0.2"
                      max="10.0"
                      step="0.05"
                      value={pervu}
                      onChange={(e) => setPervu(Number(e.target.value))}
                      className="w-full accent-amber-600"
                    />
                  </div>

                  <div>
                    <label className="font-mono font-bold block mb-1">
                      Malpractice RVU (mpRVU): {mprvu.toFixed(2)}
                    </label>
                    <span className="text-[10px] text-stone-500 block mb-1">Professional liability insurance overhead</span>
                    <input
                      type="range"
                      min="0.05"
                      max="2.0"
                      step="0.01"
                      value={mprvu}
                      onChange={(e) => setMprvu(Number(e.target.value))}
                      className="w-full accent-amber-600"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-200 uppercase">
                      Calculated Total RVU: {totalRvu.toFixed(2)} RVUs
                    </span>
                    <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                      Formula: Total RVU × Conversion Factor (${cf.toFixed(4)})
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-stone-500 block">ESTIMATED MEDICARE ALLOWED:</span>
                    <span className="text-2xl font-mono font-bold text-emerald-800 dark:text-emerald-400">
                      ${estimatedMedicareReimbursement.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scrubbing' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-base">
                Pre-Bill Claim Scrubber Rules Engine
              </h4>
              <p className="leading-relaxed">
                Before generating the ANSI X12 837 electronic file, practice management software runs automated scrubber routines to catch missing charges and fatal compliance errors.
              </p>

              <div className="space-y-2.5 mt-3 text-xs">
                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border flex items-center justify-between">
                  <div>
                    <strong className="text-stone-900 dark:text-stone-100">Scrubber Check 1: ICD-10 to CPT Medical Necessity Link</strong>
                    <p className="text-stone-600 dark:text-stone-400 mt-0.5">
                      Verifies that each service line has a valid diagnosis pointer in Box 24E matching local coverage determinations (LCD).
                    </p>
                  </div>
                  <span className="text-emerald-600 font-bold font-mono">ACTIVE</span>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border flex items-center justify-between">
                  <div>
                    <strong className="text-stone-900 dark:text-stone-100">Scrubber Check 2: Gender vs Procedure Validation</strong>
                    <p className="text-stone-600 dark:text-stone-400 mt-0.5">
                      Blocks claims billing prostate biopsies for female patients or cervical pap smears for male patients.
                    </p>
                  </div>
                  <span className="text-emerald-600 font-bold font-mono">ACTIVE</span>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded border flex items-center justify-between">
                  <div>
                    <strong className="text-stone-900 dark:text-stone-100">Scrubber Check 3: NDC Drug Units Alignment</strong>
                    <p className="text-stone-600 dark:text-stone-400 mt-0.5">
                      Checks that J-codes carry 11-digit National Drug Code (NDC) numbers and corresponding metric unit quantities (UN, ML, GR).
                    </p>
                  </div>
                  <span className="text-emerald-600 font-bold font-mono">ACTIVE</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-stone-300 dark:border-stone-700">
          <button
            onClick={() => setActiveModule('coding')}
            className="text-xs font-serif font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1"
          >
            ← Previous: Stage 6 Medical Coding
          </button>

          <button
            onClick={() => setActiveModule('claim-submission')}
            className="skeuo-btn-primary px-5 py-2.5 rounded-lg text-xs sm:text-sm font-serif font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
          >
            <span>Proceed to Stage 8: Claim Submission (CMS-1500 & UB-04)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
