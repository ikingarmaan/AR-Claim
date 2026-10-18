import React, { useState } from 'react';

export const EmLevelTree: React.FC = () => {
  const [patientType, setPatientType] = useState<'established' | 'new'>('established');
  const [selectedLevel, setSelectedLevel] = useState<number>(3); // Level 3 default (99213/99203)

  const levelsData = {
    established: [
      {
        level: 2,
        cpt: '99212',
        time: '10–19 mins',
        mdm: 'Straightforward',
        problems: '1 self-limited or minor problem (e.g. cold, insect bite)',
        data: 'Minimal or none',
        risk: 'Minimal risk of morbidity from additional diagnostic testing or treatment'
      },
      {
        level: 3,
        cpt: '99213',
        time: '20–29 mins',
        mdm: 'Low Complexity',
        problems: '2+ self-limited problems OR 1 stable chronic illness (e.g. well-controlled HTN) OR 1 acute uncomplicated illness/injury',
        data: 'Limited (Category 1: review of prior external notes, review of tests, ordering of tests - any 2)',
        risk: 'Low risk of morbidity (e.g., OTC medications, physical therapy referral)'
      },
      {
        level: 4,
        cpt: '99214',
        time: '30–39 mins',
        mdm: 'Moderate Complexity',
        problems: '1+ chronic illnesses with exacerbation/progression OR 2+ stable chronic illnesses OR 1 undiagnosed new problem with uncertain prognosis',
        data: 'Moderate (Must meet 1 of 3 categories: Cat 1 tests/records [need 3], Cat 2 independent interpretation, Cat 3 discussion with external provider)',
        risk: 'Moderate risk: Prescription drug management, decision regarding minor surgery with risk, decision regarding elective major surgery without risk'
      },
      {
        level: 5,
        cpt: '99215',
        time: '40–54 mins',
        mdm: 'High Complexity',
        problems: '1+ chronic illnesses with severe exacerbation/threat to life OR 1 acute illness/injury posing immediate threat to life/bodily function',
        data: 'Extensive (Must meet 2 of 3 categories: Cat 1 [need 3 tests/records], Cat 2 independent interpretation, Cat 3 discussion)',
        risk: 'High risk: Drug therapy requiring intensive monitoring for toxicity, decision regarding elective major surgery with risk, emergency major surgery'
      }
    ],
    new: [
      {
        level: 2,
        cpt: '99202',
        time: '15–29 mins',
        mdm: 'Straightforward',
        problems: '1 self-limited or minor problem',
        data: 'Minimal or none',
        risk: 'Minimal risk'
      },
      {
        level: 3,
        cpt: '99203',
        time: '30–44 mins',
        mdm: 'Low Complexity',
        problems: '2+ self-limited problems OR 1 stable chronic illness OR 1 acute uncomplicated illness',
        data: 'Limited (Any combination of 2: tests ordered/reviewed, external notes)',
        risk: 'Low risk (OTC meds, superficial dressings)'
      },
      {
        level: 4,
        cpt: '99204',
        time: '45–59 mins',
        mdm: 'Moderate Complexity',
        problems: '1+ chronic illness with mild progression OR 2+ stable chronic illnesses OR undiagnosed new problem',
        data: 'Moderate (Category 1 tests/records, or Cat 2 interpretation, or Cat 3 discussion)',
        risk: 'Moderate risk: Prescription drug management, diagnosis of systemic illness'
      },
      {
        level: 5,
        cpt: '99205',
        time: '60–74 mins',
        mdm: 'High Complexity',
        problems: 'Severe exacerbation or acute illness posing immediate threat to life',
        data: 'Extensive (2 of 3 categories met)',
        risk: 'High risk: Intensive drug toxicity monitoring, hospitalization decision'
      }
    ]
  };

  const activeLevelData = levelsData[patientType].find(l => l.level === selectedLevel) || levelsData[patientType][1];

  return (
    <div className="skeuo-paper p-5 sm:p-7 rounded-xl border border-stone-300 dark:border-stone-700 shadow-skeuo-raised mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-dashed border-stone-300 dark:border-stone-700">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-mono text-teal-800 dark:text-teal-400 font-bold bg-teal-100 dark:bg-teal-950/60 px-2.5 py-1 rounded border border-teal-300 dark:border-teal-700">
              AMA Clinical Guideline Matrix
            </span>
            <span className="text-xs font-mono text-stone-500">CPT-E/M-2021/2023</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Evaluation & Management (E/M) Level Decision Tree
          </h3>
          <p className="text-sm text-stone-800 dark:text-stone-200">
            Determine level of service based on Medical Decision Making (MDM: 2 of 3 elements) OR Total Time on date of encounter.
          </p>
        </div>

        {/* Patient Type Toggle Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200 dark:bg-stone-800 rounded-lg border border-stone-300 dark:border-stone-600">
          <button
            onClick={() => setPatientType('established')}
            className={`px-3 py-1.5 rounded text-xs font-serif font-bold transition-all ${
              patientType === 'established'
                ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 shadow-sm border border-amber-400'
                : 'text-stone-800 dark:text-stone-200 hover:text-stone-900'
            }`}
          >
            Established (99211–99215)
          </button>
          <button
            onClick={() => setPatientType('new')}
            className={`px-3 py-1.5 rounded text-xs font-serif font-bold transition-all ${
              patientType === 'new'
                ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 shadow-sm border border-amber-400'
                : 'text-stone-800 dark:text-stone-200 hover:text-stone-900'
            }`}
          >
            New Patient (99202–99205)
          </button>
        </div>
      </div>

      {/* Interactive Level Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        {levelsData[patientType].map(item => {
          const isSelected = item.level === selectedLevel;
          return (
            <button
              key={item.cpt}
              onClick={() => setSelectedLevel(item.level)}
              className={`p-3 rounded-lg text-left transition-all border ${
                isSelected
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-600 shadow-skeuo-raised ring-2 ring-amber-500/50'
                  : 'bg-white/80 dark:bg-stone-900/80 border-stone-300 dark:border-stone-700 hover:border-stone-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                  Level {item.level}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                  {item.time}
                </span>
              </div>
              <div className="text-lg font-mono font-bold text-stone-900 dark:text-stone-100 mt-1">
                CPT {item.cpt}
              </div>
              <div className="text-xs font-serif text-stone-800 dark:text-stone-200 mt-0.5">
                {item.mdm}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Level MDM 3-Pillar Breakdown */}
      <div className="skeuo-inset p-4 sm:p-5 rounded-lg bg-stone-100/90 dark:bg-stone-900/90 border border-stone-300 dark:border-stone-700">
        <div className="flex items-center justify-between pb-3 border-b border-stone-300 dark:border-stone-700">
          <div>
            <span className="text-xs font-mono text-stone-500">ACTIVE CODE SPECIFICATION:</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-mono font-bold text-amber-900 dark:text-amber-300">
                CPT {activeLevelData.cpt}
              </span>
              <span className="text-sm font-serif font-bold text-stone-700 dark:text-stone-300">
                ({activeLevelData.mdm} MDM or {activeLevelData.time})
              </span>
            </div>
          </div>
          <div className="text-xs font-mono bg-stone-200 dark:bg-stone-800 px-2.5 py-1 rounded text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-600">
            Rule: Must satisfy 2 of 3 MDM Elements
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {/* Element 1 */}
          <div className="bg-white dark:bg-stone-800 p-3 rounded-lg border border-stone-200 dark:border-stone-700 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 mb-1">
                <span>1️⃣ PROBLEMS ADDRESSED</span>
              </div>
              <div className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                Number & Complexity
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {activeLevelData.problems}
              </p>
            </div>
          </div>

          {/* Element 2 */}
          <div className="bg-white dark:bg-stone-800 p-3 rounded-lg border border-stone-200 dark:border-stone-700 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 dark:text-purple-400 mb-1">
                <span>2️⃣ DATA ANALYZED</span>
              </div>
              <div className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                Amount & Complexity
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {activeLevelData.data}
              </p>
            </div>
          </div>

          {/* Element 3 */}
          <div className="bg-white dark:bg-stone-800 p-3 rounded-lg border border-stone-200 dark:border-stone-700 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-700 dark:text-red-400 mb-1">
                <span>3️⃣ RISK OF COMPLICATIONS</span>
              </div>
              <div className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 mb-1">
                Diagnostic & Treatment Risk
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {activeLevelData.risk}
              </p>
            </div>
          </div>
        </div>

        {/* Audit Tip */}
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/40 rounded border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2">
          <span className="text-base">⚖️</span>
          <div>
            <strong>OIG Audit Defense Tip:</strong> Level 4 (99214) is the #1 audited code in US healthcare. 
            For prescription drug management to qualify under Risk, the physician note must explicitly evaluate dosage, side effects, compliance, or continue/discontinue medications. Simply listing a patient's existing meds without review defaults to Level 3!
          </div>
        </div>
      </div>
    </div>
  );
};

