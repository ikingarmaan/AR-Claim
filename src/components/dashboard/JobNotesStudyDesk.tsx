import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Layers, 
  Building2, 
  FileText, 
  Calculator, 
  BookOpen, 
  ShieldAlert,
  ArrowRight,
  Filter,
  PhoneCall,
  Tag
} from 'lucide-react';
import { 
  JOB_INTERVIEW_QUESTIONS, 
  HEALTH_PLANS_MATRIX, 
  PAYER_TIMELY_FILING_RULES, 
  POS_MASTER_DIRECTORY, 
  CLINICAL_MODIFIER_CASES,
  JobInterviewQuestion,
  ArCallScenario
} from '../../data/jobNotesData';
import { ArCallScenariosDesk } from './ArCallScenariosDesk';
import { CarcRarcDictionaryDesk } from './CarcRarcDictionaryDesk';
import { ModifiersMasteryDesk } from './ModifiersMasteryDesk';

interface JobNotesStudyDeskProps {
  onLoadIntoSimulator?: (scenario: ArCallScenario) => void;
}

export const JobNotesStudyDesk: React.FC<JobNotesStudyDeskProps> = ({ onLoadIntoSimulator }) => {
  const [activeTab, setActiveTab] = useState<'qa' | 'scenarios' | 'carc-rarc' | 'plans' | 'tfl' | 'pos' | 'cases' | 'calculator'>('qa');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Denial Rate Calculator State
  const [totalSubmitted, setTotalSubmitted] = useState<number>(1250);
  const [totalDenied, setTotalDenied] = useState<number>(65);

  const denialRate = totalSubmitted > 0 ? ((totalDenied / totalSubmitted) * 100).toFixed(2) : '0.00';
  const isHealthyRate = parseFloat(denialRate) <= 5.0;

  // Filter Q&A
  const filteredQuestions = JOB_INTERVIEW_QUESTIONS.filter((q) => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch = 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div id="jobs-notes-desk" className="skeuo-manila p-5 sm:p-8 rounded-2xl border-2 border-stone-400 dark:border-stone-600 shadow-skeuo-raised space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-dashed border-stone-400 dark:border-stone-600">
        <div>
          <div className="flex items-center gap-2">
            <span className="skeuo-badge bg-amber-900 text-amber-100 font-mono text-xs px-2.5 py-1 rounded">
              JOBS NOTES 💼 ARCHIVE
            </span>
            <span className="text-xs font-mono text-stone-800 dark:text-stone-200 font-semibold">
              FIELD TESTED REVENUE CYCLE MANAGEMENT PLAYBOOK
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2 flex items-center gap-2">
            <span>💼 Jobs Notes & Interview Master Class</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 mt-1 max-w-3xl leading-relaxed">
            Every single job interview question, payer rule, modifier vignette, duplicate denial workflow, and formula directly curated from field experience and interview notes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="skeuo-stamp-approved text-xs px-3 py-1 font-mono uppercase transform rotate-[-3deg]">
            44+ VERIFIED ANSWERS
          </div>
        </div>
      </div>

      {/* Main Tab Controls */}
      <div className="flex flex-wrap gap-2 border-b border-stone-300 dark:border-stone-700 pb-2">
        <button
          onClick={() => setActiveTab('qa')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'qa'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <span>44+ Interview Q&A</span>
        </button>

        <button
          onClick={() => setActiveTab('scenarios')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'scenarios'
              ? 'bg-rose-800 text-white border-rose-900 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <PhoneCall className={`w-4 h-4 ${activeTab === 'scenarios' ? 'text-white' : 'text-rose-700 dark:text-rose-400'}`} />
          <span>14 AR Call Scenarios</span>
          <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-mono font-bold">14</span>
        </button>

        <button
          onClick={() => setActiveTab('carc-rarc')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'carc-rarc'
              ? 'bg-rose-900 text-white border-rose-950 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <ShieldAlert className={`w-4 h-4 ${activeTab === 'carc-rarc' ? 'text-white' : 'text-rose-700 dark:text-rose-400'}`} />
          <span>CARC & RARC Codes</span>
          <span className="text-[10px] bg-rose-700 text-white px-1.5 py-0.2 rounded font-mono font-bold">49+</span>
        </button>

        <button
          onClick={() => setActiveTab('plans')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'plans'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <Building2 className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          <span>HMO vs PPO vs EPO</span>
        </button>

        <button
          onClick={() => setActiveTab('tfl')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'tfl'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <Clock className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>Payer Timely Filing</span>
        </button>

        <button
          onClick={() => setActiveTab('pos')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'pos'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <FileText className="w-4 h-4 text-purple-700 dark:text-purple-400" />
          <span>Place of Service (POS)</span>
        </button>

        <button
          onClick={() => setActiveTab('cases')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'cases'
              ? 'bg-rose-900 text-white border-rose-950 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <Tag className={`w-4 h-4 ${activeTab === 'cases' ? 'text-white' : 'text-rose-700 dark:text-rose-400'}`} />
          <span>Modifiers Masterclass</span>
          <span className="text-[10px] bg-rose-700 text-white px-1.5 py-0.2 rounded font-mono font-bold">12+</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-3.5 py-2 rounded-t-lg font-serif font-bold text-xs sm:text-sm border-t border-x transition-all flex items-center gap-1.5 ${
            activeTab === 'calculator'
              ? 'bg-white dark:bg-stone-900 border-stone-400 dark:border-stone-600 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'bg-stone-200/70 dark:bg-stone-800/60 border-transparent text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          <Calculator className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <span>Denial Rate & Duplicate Scenarios</span>
        </button>
      </div>

      {/* Tab: 14 AR Call Scenarios */}
      {activeTab === 'scenarios' && (
        <div className="space-y-4">
          <ArCallScenariosDesk onLoadIntoSimulator={onLoadIntoSimulator} />
        </div>
      )}

      {/* Tab: CARC & RARC Denial Codes */}
      {activeTab === 'carc-rarc' && (
        <div className="space-y-4">
          <CarcRarcDictionaryDesk />
        </div>
      )}

      {/* Tab 1: 44+ Interview Questions */}
      {activeTab === 'qa' && (
        <div className="space-y-4">
          {/* Search & Category Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-stone-100/80 dark:bg-stone-900/80 p-3 rounded-xl border border-stone-300 dark:border-stone-700">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder="Search question, term (e.g. 72 hr, spenddown, capitation, CLIA, COB)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-serif">
              <Filter className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400 shrink-0" />
              {[
                { id: 'all', label: 'All (44)' },
                { id: 'eligibility-cob', label: 'Eligibility & COB' },
                { id: 'coding-modifiers', label: 'Coding & Modifiers' },
                { id: 'claim-forms', label: 'Claim Forms' },
                { id: 'ar-denials', label: 'A/R & Denials' },
                { id: 'payers-compliance', label: 'Payers & Rules' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-amber-800 text-white font-bold shadow-sm'
                      : 'bg-white/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-3">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedId === q.id;

              return (
                <div
                  key={q.id}
                  className="skeuo-paper rounded-xl border border-stone-300 dark:border-stone-700 shadow-sm overflow-hidden transition-all hover:border-amber-600"
                >
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="w-full text-left p-4 flex items-start justify-between gap-3 bg-gradient-to-r from-stone-50/50 to-amber-50/20 dark:from-stone-900/50 dark:to-stone-900/30"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-amber-800 text-white font-mono text-xs flex items-center justify-center font-bold">
                        {q.number}
                      </span>
                      <div>
                        <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                          {q.question}
                        </h3>
                        <p className="text-xs text-amber-900 dark:text-amber-300 font-mono mt-0.5">
                          Key: {q.keyTakeaway}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 mt-1">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-stone-600 dark:text-stone-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-600 dark:text-stone-300" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-2 border-t border-stone-200 dark:border-stone-700/80 bg-white dark:bg-stone-950/40 space-y-3 animate-fadeIn">
                      <div className="p-3 bg-amber-50/80 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/60">
                        <strong className="text-xs font-mono uppercase text-amber-900 dark:text-amber-300 block mb-1">
                          Official Standard Answer (From Jobs Notes):
                        </strong>
                        <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line">
                          {q.answer}
                        </p>
                      </div>

                      {q.notesFromDoc && (
                        <div className="text-xs text-stone-700 dark:text-stone-300 font-sans pl-2 border-l-2 border-emerald-600">
                          <strong className="text-emerald-800 dark:text-emerald-400 font-serif">A/R Specialist Field Advice: </strong>
                          {q.notesFromDoc}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: HMO vs PPO vs EPO */}
      {activeTab === 'plans' && (
        <div className="space-y-4">
          <div className="skeuo-paper p-5 rounded-xl border border-stone-300 dark:border-stone-700 overflow-x-auto">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
              Commercial Plan Types Comparison Matrix
            </h3>
            <p className="text-xs text-stone-700 dark:text-stone-300 mb-4">
              Directly extracted from the User's Job Notes: essential for patient registration, scheduling, and billing.
            </p>

            <table className="w-full text-left text-xs sm:text-sm border-collapse font-sans">
              <thead>
                <tr className="bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-serif border-b-2 border-stone-400">
                  <th className="p-2.5">Feature</th>
                  <th className="p-2.5 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200">HMO</th>
                  <th className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200">PPO</th>
                  <th className="p-2.5 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200">EPO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-700 text-stone-800 dark:text-stone-200">
                <tr>
                  <td className="p-2.5 font-bold">Full Name</td>
                  <td className="p-2.5">Health Maintenance Organization</td>
                  <td className="p-2.5">Preferred Provider Organization</td>
                  <td className="p-2.5">Exclusive Provider Organization</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Primary Care Physician (PCP)?</td>
                  <td className="p-2.5 text-emerald-700 dark:text-emerald-400 font-bold">YES (Mandatory)</td>
                  <td className="p-2.5 text-stone-600 dark:text-stone-400">NO</td>
                  <td className="p-2.5">Sometimes</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Specialist Referral Required?</td>
                  <td className="p-2.5 text-emerald-700 dark:text-emerald-400 font-bold">YES (Mandatory)</td>
                  <td className="p-2.5 text-stone-600 dark:text-stone-400">NO</td>
                  <td className="p-2.5 text-stone-600 dark:text-stone-400">NO</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">In-Network Benefits?</td>
                  <td className="p-2.5 text-emerald-700 dark:text-emerald-400 font-bold">YES</td>
                  <td className="p-2.5 text-emerald-700 dark:text-emerald-400 font-bold">YES</td>
                  <td className="p-2.5 text-emerald-700 dark:text-emerald-400 font-bold">YES</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Out-of-Network Benefits?</td>
                  <td className="p-2.5 text-rose-700 dark:text-rose-400 font-bold">NO (Zero coverage)</td>
                  <td className="p-2.5 text-emerald-700 dark:text-emerald-400 font-bold">YES (Higher deductible/coins)</td>
                  <td className="p-2.5 text-rose-700 dark:text-rose-400 font-bold">NO (Zero coverage)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Monthly Premium Level</td>
                  <td className="p-2.5 text-emerald-800 dark:text-emerald-400 font-medium">Lowest</td>
                  <td className="p-2.5 text-rose-800 dark:text-rose-400 font-medium">Highest</td>
                  <td className="p-2.5 text-amber-800 dark:text-amber-400 font-medium">Moderate to High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Payer Timely Filing */}
      {activeTab === 'tfl' && (
        <div className="space-y-4">
          <div className="skeuo-paper p-5 rounded-xl border border-stone-300 dark:border-stone-700">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
              Payer Timely Filing Deadlines & Appeal Proof
            </h3>
            <p className="text-xs text-stone-700 dark:text-stone-300 mb-4">
              Timely filing rules specified in the Jobs Notes. Once exceeded, claims receive an unappealable CO-29 denial unless valid clearinghouse acceptance proof is produced.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PAYER_TIMELY_FILING_RULES.map((rule) => (
                <div 
                  key={rule.payer}
                  className="p-4 bg-white dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-700 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                      {rule.payer}
                    </h4>
                    <span className="skeuo-badge bg-rose-800 text-white font-mono text-xs px-2 py-0.5 rounded">
                      {rule.limitDays} DAYS
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-stone-700 dark:text-stone-300 font-sans">
                    <div>
                      <strong className="text-stone-900 dark:text-stone-100">Calculated From: </strong>
                      {rule.fromEvent}
                    </div>
                    <div>
                      <strong className="text-stone-900 dark:text-stone-100">Appeal Deadline: </strong>
                      {rule.appealLimitDays} days from denial remit date
                    </div>
                    <div className="p-2 bg-stone-50 dark:bg-stone-950/50 rounded border text-[11px] font-mono text-stone-800 dark:text-stone-200">
                      <strong>Valid Proof: </strong>
                      {rule.acceptableProof}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Place of Service (POS) Master Directory */}
      {activeTab === 'pos' && (
        <div className="space-y-4">
          <div className="skeuo-paper p-5 rounded-xl border border-stone-300 dark:border-stone-700">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                  Place of Service (POS) Master Directory (CMS-1500 Box 24B)
                </h3>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  Complete POS numbers and definitions extracted from Page 8 of the user's RCM notes.
                </p>
              </div>
              <span className="skeuo-badge bg-purple-800 text-white font-mono text-xs px-2 py-0.5 rounded">
                17 OFFICIAL CODES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {POS_MASTER_DIRECTORY.map((item) => (
                <div
                  key={item.code}
                  className="p-3 bg-white dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-700 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-800">
                        POS {item.code}
                      </span>
                      <span className="text-[10px] font-mono text-stone-600 dark:text-stone-300">Box 24B</span>
                    </div>
                    <h5 className="font-serif font-bold text-xs text-stone-900 dark:text-stone-100 mt-1">
                      {item.name}
                    </h5>
                    <p className="text-[11px] text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-stone-200 dark:border-stone-800 text-[10px] text-stone-600 dark:text-stone-400">
                    Typical: {item.commonSpecialties}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Modifiers Masterclass */}
      {activeTab === 'cases' && (
        <div className="space-y-4">
          <ModifiersMasteryDesk />
        </div>
      )}

      {/* Tab 6: Denial Rate & Duplicate Scenarios */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          {/* Denial Rate Calculator */}
          <div className="skeuo-paper p-5 sm:p-6 rounded-xl border border-stone-300 dark:border-stone-700">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
              📊 Live Denial Rate Formula & Benchmark Calculator
            </h3>
            <p className="text-xs text-stone-700 dark:text-stone-300 mb-4">
              Formula from user's notes: <code>Denial Rate (%) = (Total Denied Claims / Total Claims Submitted) * 100</code>. Industry benchmark target is &lt; 5.0%.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <label className="text-xs font-mono text-stone-800 dark:text-stone-200 block mb-1 font-bold">
                  Total Claims Submitted
                </label>
                <input
                  type="number"
                  value={totalSubmitted}
                  onChange={(e) => setTotalSubmitted(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full p-2 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 font-mono text-sm text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-stone-800 dark:text-stone-200 block mb-1 font-bold">
                  Total Denied Claims
                </label>
                <input
                  type="number"
                  value={totalDenied}
                  onChange={(e) => setTotalDenied(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full p-2 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 font-mono text-sm text-stone-900 dark:text-stone-100"
                />
              </div>

              <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-700 text-center">
                <span className="text-xs font-mono uppercase text-stone-700 dark:text-stone-300 font-bold">
                  Calculated Denial Rate
                </span>
                <div className={`text-3xl font-mono font-bold mt-1 ${
                  isHealthyRate ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                }`}>
                  {denialRate}%
                </div>
                <span className={`text-[11px] font-serif font-bold ${
                  isHealthyRate ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
                }`}>
                  {isHealthyRate ? '✓ Within HFMA Target (<5%)' : '⚠ Action Required (>5% leakage)'}
                </span>
              </div>
            </div>
          </div>

          {/* Duplicate Denial 2 Scenarios */}
          <div className="skeuo-paper p-5 sm:p-6 rounded-xl border border-stone-300 dark:border-stone-700 space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              🔄 The 2 Duplicate Denial (CO-18) Scenarios & Resolution Tree
            </h3>
            <p className="text-xs text-stone-700 dark:text-stone-300">
              As emphasized in user's notes: duplicate denials happen under two distinct scenarios requiring totally opposite actions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-300 dark:border-emerald-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-mono text-xs flex items-center justify-center font-bold">1</span>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                    Scenario 1: Legitimate Repeat Service
                  </h4>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  The provider legitimately rendered the same procedure twice on the same Date of Service (e.g., repeat EKG after cardiac medication, serial ICU lab tests, bilateral views).
                </p>
                <div className="p-3 bg-white dark:bg-stone-900 rounded border border-emerald-200 dark:border-emerald-900 text-xs font-mono text-emerald-900 dark:text-emerald-300">
                  <strong>Action: </strong> Append modifier (76 for repeat same MD, 77 different MD, 91 for repeat lab, 59/XS for separate site) + submit clinical records for reprocessing.
                </div>
              </div>

              <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 rounded-lg border border-rose-300 dark:border-rose-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-700 text-white font-mono text-xs flex items-center justify-center font-bold">2</span>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                    Scenario 2: Accidental Double Billing
                  </h4>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  The exact same claim or service line was submitted twice by mistake (software glitch, duplicate electronic upload, or billing staff error).
                </p>
                <div className="p-3 bg-white dark:bg-stone-900 rounded border border-rose-200 dark:border-rose-900 text-xs font-mono text-rose-900 dark:text-rose-300">
                  <strong>Action: </strong> Look up original claim status, record check # or EFT trace ID, verify payment, and immediately VOID / cancel the second duplicate claim.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
