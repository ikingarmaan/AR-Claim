# RCM & US Medical AR Academy 🏥

> An interactive, production-ready educational web application designed to teach the complete US Healthcare Revenue Cycle Management (RCM) and Accounts Receivable (AR) claim lifecycle.

---

## 🌟 Key Application Features

1. **Animated Revenue Cycle Pipeline (Hero)**:
   - Visual step-by-step interactive flow tracing a claim through 8 stages: *Patient Registration (Day 0) ➔ Eligibility (EDI 270/271) ➔ Medical Coding & Charge Capture (CPT/ICD-10) ➔ Claim Scrubbing & NCCI Edits ➔ Clearinghouse Transmission (EDI 837P/I) ➔ Payer Adjudication Engine ➔ Payment Posting (ERA 835 / EOB) ➔ AR Follow-Up & Denial Management*.
   - Play/Pause animation, stage selection, turnaround times, and responsible RCM roles.

2. **Module 1: RCM Foundations & Real-Time Math Simulator**:
   - **Interactive 3D Flip Flashcards** for Patient Cost-Sharing (PR-1 Deductible, PR-2 Coinsurance, PR-3 Copay, Premium) and Billing Mechanics (Allowed Amount, CO-45 Contractual Adjustment, Capitation, Payer Offsets, Inclusive vs. Bundled).
   - **Compliance & Legal Identifiers**: HIPAA (1996) / HITECH (2009), NPI (Type 1 vs Type 2), TIN/EIN, PTAN, Taxonomy, CLIA Number, First-Party vs. Third-Party Accounts, and IPA networks.
   - **Interactive RCM Math Calculator**: Live slider sandbox calculating Billed Amount, Allowed Amount, CO-45 write-offs, PR breakdown, and strict balance billing warnings under the federal No Surprises Act.

3. **Module 2: Claim Forms Explorer (CMS-1500 & UB-04)**:
   - **Interactive CMS-1500 Visual Map**: Clickable hotspots for 12 key boxes: Box 12 (ROI), Box 13 (AOB), Box 17/17B (Referring Provider NPI), Box 19 (Narrative), Box 21 (ICD-10-CM Pointers A–L), Box 22 (Code 7 & Original ICN), Box 23 (Prior Auth / CLIA), Box 24D (CPT & Modifiers), Box 24G (Units), Box 25 (TIN/EIN), Box 32 (Service Facility - NO P.O. Box), Box 33/33A (Billing Provider NPI).
   - **Professional vs. Facility Billing Matrix**: 33 boxes (CMS-1500 / 837P) vs 81 form locators (UB-04 / 837I).
   - **UB-04 Specifics**: Revenue Codes, Value Codes ("How Much"), and Occurrence Codes ("When").

4. **Module 3: US Insurance Ecosystem & Medicare**:
   - **Medicare Deep Dive**: Eligibility (65+, SSDI 24 months, ESRD, ALS), Parts A, B, C (Advantage), D (Rx), and Hospice.
   - **3-Way Interactive Matrix**: Original Medicare vs. Medicare Advantage (Part C) vs. Medigap Supplement across 10 dimensions.
   - **MSP Codes**: Code 12 (Working Aged), Code 13 (ESRD), Code 14 (No-Fault / Auto), Code 15 (Workers' Comp).
   - **Medicaid Spenddown Simulator**: Visual gauge calculating how medical bills offset excess income to trigger active Medicaid.
   - **Managed Care Comparison**: HMO, PPO, EPO, and POS plan structures.
   - **The Birthday Rule Calculator Widget**: Interactive calculator resolving primary child coverage with NAIC calendar rules and divorce decree exceptions.

5. **Module 4: Medical Coding & The Modifier Masterclass**:
   - Interactive CPT Range Slider across all 6 sections (E&M with 3-year rule, Anesthesia, Surgery, Radiology, Pathology & Lab, Medicine).
   - Place of Service (POS) Codes badge grid (11 Office, 21 Inpatient, 22 On-Campus Outpatient, 23 ER, 24 ASC, 02/10 Telehealth).
   - **In-Depth Modifier Deep Dives with Real Clinical Cases**:
     - **Modifier 25**: Preventive + Migraine, Preventive + Cyst excision.
     - **Modifier 59**: Cryotherapy wart + Skin tag, Shoulder US + Joint injection.
     - **Modifier 76 & 77**: Same vs. different physician repeat procedures.
     - **Modifier 91**: Repeat clinical diagnostic lab tests (hemolyzed samples, serial ICU tests).
     - **LT & RT / OU vs. 50**: Anatomical laterality and bilateral procedures.
     - **NCCI Subset Modifiers**: XE, XS, XP, XU.
     - **Hospice & Component**: GV, GW, TC vs. 26.
   - 5 Best Practices to Prevent Modifier Denials & FAQ Accordion.

6. **Module 5: AR Analytics, KPIs, Aging & Note Documentation**:
   - Days in AR (< 40 Days), Clean Claim Rate (>= 95%), First Pass Resolution, and Denial Rate (< 5%).
   - AR Aging Buckets (0–30, 31–60, 61–90, 91–120, 120+ days) with TFL urgency flags.
   - 8-point Denial Reduction Checklist.
   - **Interactive AR Note Builder**: Generates standardized 6-point audit trail notes (Date, Rep Name, Call Ref #, Claim Status, Action Taken, Next Follow-Up Date) with copy-to-clipboard and history persistence.

7. **Module 6: The 14-Scenario AR Call & Denial Playbook**:
   - Complete decision trees, workflows, and verbatim representative scripts for:
     1. Claim Not on File (CNOF)
     2. Member Not Eligible on DOS
     3. Claim in Process / Pending
     4. Claim is Paid (Payment Not Posted)
     5. Duplicate Claim (CO-18)
     6. Untimely Filing (CO-29 / POTF)
     7. Services Not Covered (CO-96)
     8. Maximum Benefit Met (CO-119)
     9. Invalid / No Pre-Auth (CO-197)
     10. Denied for COB (CO-22)
     11. Denied/Pending for Medical Records
     12. Denied for Additional Information (CO-16 / RARCs)
     13. Inclusive, Bundled, Mutually Exclusive (CO-97)
     14. Primary Paid More Than Secondary Allowed Amount
   - CARC & RARC Quick-Lookup Dictionary & 4-Tier Appeal Hierarchy.

8. **Module 7: Live Call Scripts & NATO Phonetic Trainer**:
   - Full A–Z NATO table with tips.
   - **Live Policy ID & NPI Phonetic Converter with Web Speech API audio pronunciation** (`window.speechSynthesis`).
   - Dynamic Telephonic Roleplay with customizable mock inputs for GPD verification, Fast-track AR status, and ER inpatient precertification.

9. **Module 8: Gamified MCQ Assessment & Certification Quiz Engine**:
   - 42 comprehensive MCQs across all modules.
   - Practice Mode (instant rationales) vs. Timed Exam Mode (25 questions, 25 minutes).
   - Real-time score calculation, pass/fail grading (>=80%), celebratory confetti, and **Printable Official Certificate of Completion Credential Badge**.

10. **Global Omnipresent Search (`Cmd/Ctrl + K`)**:
    - Fast indexed search of all CARC codes, modifiers, claim form boxes, terms, and scenarios.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (HealthTech Dark/Light Theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Audio Synthesis**: Web Speech API (`speechSynthesis`)
- **Effects**: Canvas Confetti
- **State & Storage**: React Context + `localStorage`

---

## 🚀 Local Development

```bash
# Navigate to project directory
cd rcm-ar-academy

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Deployment Target: Render (Static Site)

The repository includes a production-ready `render.yaml` and `public/_redirects` file configured for single-page app (SPA) routing:

### Option A: Automatic Blueprint Deployment
1. Push this repository to GitHub or GitLab.
2. In the [Render Dashboard](https://dashboard.render.com), click **New +** ➔ **Blueprint**.
3. Select your repository. Render will automatically parse `render.yaml`:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `./dist`
   - **Rewrite Rules**: `/* -> /index.html` (HTTP 200)

### Option B: Manual Static Site Setup
1. In Render Dashboard, click **New +** ➔ **Static Site**.
2. Connect your repository.
3. Configure settings:
   - **Name**: `rcm-ar-academy`
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Under **Redirects/Rewrites**:
   - **Type**: Rewrite
   - **Source**: `/*`
   - **Destination**: `/index.html`
5. Click **Create Static Site**.
