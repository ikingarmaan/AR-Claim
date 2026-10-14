import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertOctagon,
  Volume2,
  VolumeX,
  FileText,
  DollarSign
} from 'lucide-react';
import { ClaimyMascot, ClaimyMood } from '../common/ClaimyMascot';

interface ComicScene {
  id: number;
  title: string;
  badge: string;
  mascotMood: ClaimyMood;
  outcomeType: 'neutral' | 'green' | 'red';
  dialogue: string;
  storyCaption: string;
  visualGraphic: 'registration' | 'eligibility' | 'coding' | 'scrubbing' | 'payer' | 'paid' | 'denied';
  soundEffectText: string;
  learningTakeaway: string;
}

const COMIC_SCENES: ComicScene[] = [
  {
    id: 1,
    title: 'Scene 1: Claimy is Born at Registration!',
    badge: 'Day 0 • Front Desk Intake',
    mascotMood: 'happy',
    outcomeType: 'neutral',
    dialogue: '"Hi there! I am Claimy, your friendly medical claim! I was just created at the clinic check-in desk with patient name, DOB, and policy number!"',
    storyCaption: 'The front desk verifies the patient photo ID and ensures CMS-1500 Box 12 (Release of Info) and Box 13 (Assignment of Benefits) are signed.',
    visualGraphic: 'registration',
    soundEffectText: '*BEEP! Patient Card Scanned!*',
    learningTakeaway: 'Always capture secondary coverage and check member ID spelling before the patient sees the doctor!'
  },
  {
    id: 2,
    title: 'Scene 2: The 270/271 Electronic Gatekeeper',
    badge: 'Pre-Service • Eligibility Check',
    mascotMood: 'reading',
    outcomeType: 'green',
    dialogue: '"Whoa, look at the giant electronic gates! The system is firing an EDI 270 inquiry to the insurance company to see if my policy is active!"',
    storyCaption: 'GREEN LIGHT! The 271 response returns active coverage with an 80/20 coinsurance and a $50 deductible remaining. If red, coverage is terminated.',
    visualGraphic: 'eligibility',
    soundEffectText: '*PING! EDI 271 Verification: ACTIVE!*',
    learningTakeaway: 'Real-time 270/271 eligibility verification prevents 35% of all downstream claim denials!'
  },
  {
    id: 3,
    title: 'Scene 3: The Medical Coding Lab',
    badge: 'Post-Visit • CPC / CCS Coders',
    mascotMood: 'thinking',
    outcomeType: 'neutral',
    dialogue: '"The doctor examined the patient and documented an acute migraine and annual checkup. Now certified coders are giving me my secret CPT & ICD-10 powers!"',
    storyCaption: 'Coders assign CPT 99395 on line 1, and 99213 with Modifier 25 on line 2, linking them to separate ICD-10 diagnosis codes.',
    visualGraphic: 'coding',
    soundEffectText: '*SWOOSH! Modifier 25 Appended!*',
    learningTakeaway: 'Without Modifier 25, the insurance computer auto-bundles the sick visit with the preventive exam!'
  },
  {
    id: 4,
    title: 'Scene 4: The Bubbly Claim Scrubbing Bath',
    badge: 'Pre-Submission • Rules Engine',
    mascotMood: 'scrubbing',
    outcomeType: 'green',
    dialogue: '"Splish, splash! Time for a warm bubble bath in the clearinghouse claim scrubber! Washing off missing NPIs, incorrect PO Boxes, and NCCI edit errors!"',
    storyCaption: 'The automated scrubber checks 400+ payer rules. Because Claimy has Box 24J NPI, Box 25 Tax ID, and valid diagnosis pointers, Claimy gets a 100% CLEAN score!',
    visualGraphic: 'scrubbing',
    soundEffectText: '*SCRUB DUB! Clean Claim Score: 100%!*',
    learningTakeaway: 'Fixing errors inside the scrubber takes 30 seconds; fixing them after payer rejection takes 45 days!'
  },
  {
    id: 5,
    title: 'Scene 5: Entering the Payer Adjudication Castle',
    badge: '14–30 Days • Payer Engine',
    mascotMood: 'thinking',
    outcomeType: 'neutral',
    dialogue: '"I have been transmitted via HIPAA EDI 837P into the payer’s computer vault! The automated claims engine is checking fee schedules and deductible math..."',
    storyCaption: 'Will the payer pay the claim (Green Path), or issue a CARC denial code (Red Path)?',
    visualGraphic: 'payer',
    soundEffectText: '*WHIRRR! Calculating Allowed Amount...*',
    learningTakeaway: 'Clean electronic claims adjudicate in 14–21 days; Medicare clean claim statutory floor is 14 days.'
  },
  {
    id: 6,
    title: 'Scene 6A: THE GREEN ENDING — Claimy is Paid!',
    badge: 'Success • Payment Posted',
    mascotMood: 'celebrating',
    outcomeType: 'green',
    dialogue: '"YAHOO! I PASSED! The payer sent an 835 Electronic Remittance Advice! Allowed amount $150, Paid $120 via EFT, with $30 assigned to PR-2 coinsurance!"',
    storyCaption: 'The clinic cash poster auto-posts the payment, writes off the CO-45 contractual difference, and Claimy rocks sunglasses with dollar signs!',
    visualGraphic: 'paid',
    soundEffectText: '*KA-CHING! EFT Deposit $120.00 Cleared!*',
    learningTakeaway: 'Participating providers accept the allowed amount and never balance bill the CO-45 write-off!'
  },
  {
    id: 7,
    title: 'Scene 6B: THE RED ENDING — Denied! Time for AR Rescue!',
    badge: 'Denied • AR Follow-up Call',
    mascotMood: 'denied',
    outcomeType: 'red',
    dialogue: '"OUCH! Red stamp alert! CARC CO-197: Missing Prior Authorization! Don’t panic—Coach AR is grabbing the headset and filing a 72-hour Retro-Auth appeal!"',
    storyCaption: 'The AR specialist calls the payer, obtains the rep name and reference number, links the emergency hospital authorization, and turns this red denial into green cash!',
    visualGraphic: 'denied',
    soundEffectText: '*ALARM! Red Denial CO-197 Detected!*',
    learningTakeaway: 'Every denial has an AR resolution playbook! Over 65% of denied claims can be overturned with proper appeals.'
  }
];

export const ClaimyJourneyComic: React.FC = () => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [renderMode, setRenderMode] = useState<'3d' | 'vector'>('3d');

  const scene = COMIC_SCENES[currentSceneIdx];

  // Play a retro synth tone using Web Audio API
  const playTone = (freq: number, type: OscillatorType = 'sine', duration = 0.15) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // AudioContext muted or unsupported
    }
  };

  const nextScene = () => {
    playTone(520, 'triangle');
    setCurrentSceneIdx(prev => (prev < COMIC_SCENES.length - 1 ? prev + 1 : 0));
  };

  const prevScene = () => {
    playTone(400, 'triangle');
    setCurrentSceneIdx(prev => (prev > 0 ? prev - 1 : COMIC_SCENES.length - 1));
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 border-2 border-emerald-300 flex items-center justify-center font-black text-xl shadow-xs">
            🎨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                AI Cartoon Animation
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                Interactive Comic Explainer
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 tracking-tight">
              Claimy's Big Adventure: From Paper Slip to Clean Paid Check!
            </h2>
          </div>
        </div>

        {/* Comic Player Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSoundEnabled(prev => !prev)}
            className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
              soundEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
            title={soundEnabled ? 'Mute Cartoon SFX' : 'Enable Cartoon SFX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={prevScene}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            title="Previous Scene"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs font-bold text-slate-700 px-2">
            {scene.id} / {COMIC_SCENES.length}
          </span>

          <button
            type="button"
            onClick={nextScene}
            className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
            title="Next Scene"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Comic Story Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        {/* Left: Animated Cartoon Mascot Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl relative overflow-hidden min-h-[320px]">
          {/* Comic Action Sound Splash Bubble */}
          <motion.div
            key={scene.soundEffectText}
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 5 }}
            transition={{ type: 'spring', damping: 10 }}
            className={`absolute top-4 right-4 text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-full shadow-md z-10 border-2 ${
              scene.outcomeType === 'red'
                ? 'bg-red-500 text-white border-red-700'
                : scene.outcomeType === 'green'
                ? 'bg-emerald-500 text-white border-emerald-700'
                : 'bg-amber-400 text-slate-950 border-amber-600'
            }`}
          >
            {scene.soundEffectText}
          </motion.div>

          {/* Render Mode Switcher */}
          <div className="absolute top-4 left-4 z-10 flex items-center bg-white border border-slate-200 rounded-full p-0.5 shadow-xs">
            <button
              type="button"
              onClick={() => setRenderMode('3d')}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black transition-all ${
                renderMode === '3d'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              3D AI Render
            </button>
            <button
              type="button"
              onClick={() => setRenderMode('vector')}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black transition-all ${
                renderMode === 'vector'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Animated Vector
            </button>
          </div>

          {/* Mascot Display Area */}
          <div className="py-4 my-2 flex items-center justify-center">
            {renderMode === '3d' ? (
              <motion.div
                key={`3d-${scene.outcomeType}-${scene.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex flex-col items-center"
              >
                <div className={`w-44 h-44 rounded-2xl overflow-hidden border-4 shadow-lg ${
                  scene.outcomeType === 'red'
                    ? 'border-red-400 ring-4 ring-red-100'
                    : 'border-emerald-400 ring-4 ring-emerald-100'
                }`}>
                  <img
                    src={scene.outcomeType === 'red' ? '/claimy-denied.jpg' : '/claimy-mascot.jpg'}
                    alt="Claimy AI Cartoon Mascot"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span>AI-Generated 3D Cartoon Model</span>
                </div>
              </motion.div>
            ) : (
              <ClaimyMascot mood={scene.mascotMood} size="xl" interactive />
            )}
          </div>

          {/* Under-mascot stage pill */}
          <div className="text-center mt-2">
            <span
              className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                scene.outcomeType === 'red'
                  ? 'bg-red-100 text-red-700 border border-red-300'
                  : scene.outcomeType === 'green'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-blue-100 text-blue-800 border border-blue-200'
              }`}
            >
              {scene.badge}
            </span>
          </div>
        </div>

        {/* Right: Story Dialogue & Educational Takeaway */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Comic Episode #{scene.id}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {scene.title}
            </h3>
          </div>

          {/* Big Comic Dialogue Speech Bubble */}
          <div className="p-5 rounded-2xl bg-white border-2 border-slate-300 shadow-md relative">
            <div className="font-extrabold text-xs uppercase text-slate-400 mb-1 flex items-center gap-1.5">
              <span>💬 Claimy Speaks:</span>
            </div>
            <p className="text-base text-slate-800 font-bold leading-relaxed">
              {scene.dialogue}
            </p>
          </div>

          {/* Narrative Explanation */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900">What Happens in the Clinic: </span>
            {scene.storyCaption}
          </div>

          {/* Golden Learning Rule in Green or Red */}
          <div
            className={`p-4 rounded-2xl border-2 flex items-start gap-3 ${
              scene.outcomeType === 'red'
                ? 'bg-red-50 border-red-200 text-red-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            {scene.outcomeType === 'red' ? (
              <AlertOctagon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <span className="font-black uppercase tracking-wider block mb-0.5">
                Key RCM Lesson:
              </span>
              <p className="leading-relaxed font-semibold">{scene.learningTakeaway}</p>
            </div>
          </div>

          {/* Next Episode Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-1.5">
              {COMIC_SCENES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    playTone(480, 'sine');
                    setCurrentSceneIdx(i);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    currentSceneIdx === i
                      ? 'w-8 bg-emerald-600'
                      : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                  title={`Jump to Scene ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextScene}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
            >
              <span>{currentSceneIdx === COMIC_SCENES.length - 1 ? 'Start Over' : 'Next Comic Scene'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
