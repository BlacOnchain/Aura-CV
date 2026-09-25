# FlowCV Resume Builder & ATS Job Studio

A modern, production-grade resume management application and ATS optimization platform. Designed around the multi-phase FlowCV creation workflow: **Content**, **Design**, **Check**, and **Download**.

---

## Features

### 1. Resumes Dashboard (`/resumes`)
- **Multi-Resume Management:** Create, clone, rename, switch between, and delete targeted resumes for different job applications.
- **Search & Filter:** Instant real-time filtering by candidate name, target role title, or resume file name.
- **Pre-Built Starter Profiles:** Includes starter presets for Software Engineers, Product Managers, and blank canvas templates.
- **Persistent Local State:** Automatically preserves multiple resumes and session state in `localStorage`.

### 2. Multi-Phase Editor Workflow
- **Content Phase:**
  - Structured modular forms for Personal Info, Executive Summary, Work Experience, Education, Projects, Skill Categories, Certifications, and Languages.
  - Interactive bullet-point reordering and editing with active verb suggestions.
  - Tag-based technical skills manager with categorized domains.
- **Design Phase:**
  - Modern resume templates: *Moderna*, *Executive Minimal*, *Tech Horizon*, *Clean Compact*, and *Nordic Clean*.
  - Live typography selection: Modern Sans (Inter), Editorial Serif (Merriweather), Tech Mono (JetBrains Mono).
  - Palette picker with primary accent colors.
  - Spacing and layout density controls (Compact, Normal, Relaxed) with 1-click **Auto-Fit to 1 Page**.
- **Check Phase (ATS Audit):**
  - Live ATS score breakdown (0–100%) checking contact completeness, executive summary density, action verb strength, and quantified metrics.
  - Real-time bullet-by-bullet audit showing presence of numbers, percentages, and strong accomplishment verbs.
- **Download Phase:**
  - High-resolution standard A4 print/PDF layout.
  - Export to clean JSON for portability and backup.
  - Import JSON to restore or migrate data across devices.

### 3. AI Skills & ATS Keyword Suggester
- **In-Demand Competency Engine:** Analyzes your target role (e.g., Senior Full Stack Engineer, Product Manager, Data Scientist) and suggests relevant, categorized skills:
  - Core Languages & Runtimes
  - Frameworks & Client Libraries
  - Cloud, DevOps & Infrastructure
  - Databases, Storage & Caching
  - Architecture, Agile & Soft Skills
- **ATS High-Yield Keywords:** Highlights top recruiter filter keywords with relevance badges (*Core Requirement*, *High Demand*, *Trending*).
- **One-Click Add:** Directly append individual skills or entire categories to your resume domains with deduplication.

### 4. Resume & LinkedIn Import
- **PDF Resume Upload:** Drag and drop any existing PDF resume or LinkedIn export ("Save to PDF") to parse experience, education, contact info, and skills into structured resume fields.
- **LinkedIn Profile Import:** Parse directly from LinkedIn URLs or pasted profile summaries/experiences.
- **Flexible Options:** Choose to overwrite your active resume or create as a brand-new saved resume.

### 5. Tailored Cover Letter Generator
- Generates 3–4 paragraph job-specific cover letters tailored to your target company, role title, and job requirements.
- Uses your resume's real experiences and technical accomplishments.
- Copy to clipboard or export directly as a `.txt` file.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide React icons
- **Build Tool:** Vite
- **Backend:** Node.js, Express (with Vite middleware support)
- **PDF Rendering:** Native CSS `@media print` with exact A4 dimensions, print pagination breaks, and zero watermarks

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### Installation

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd resume-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your API configuration to `.env` if using server-side features.

4. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

### Production Build

To build the client bundle and run in production:
```bash
npm run build
npm start
```

---

## Deployment & Testing

### 1. Live Testing (AI Studio)
The app is currently hosted on Google Cloud Run via AI Studio. You can test the full-stack features (AI parsing, ATS audit, resume enhancement) using the **Shared App URL** provided in the AI Studio interface.

### 2. GitHub Deployment (Manual)
To host this project on your own GitHub:
1. **Create a Repository:** Create a new repository on GitHub.
2. **Push Code:**
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```
3. **CI/CD:** A GitHub Action is included in `.github/workflows/ci.yml` that automatically validates your code on every push.

### 3. Production Hosting (SaaS)
Since this is a full-stack Node.js app, it requires a server environment. Recommended platforms:
- **Render / Fly.io / Railway:** Connect your GitHub repo, and they will automatically detect the `package.json` and run `npm run build` followed by `npm start`.
- **Environment Variables:** Ensure you set `GEMINI_API_KEY` in your production platform's environment settings.

---

## Project Structure

```text
├── index.html                   # HTML entry point with layout metadata
├── server.ts                    # Express API server (ATS, AI bullet/summary/skills, PDF parsing)
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite bundler configuration
└── src/
    ├── App.tsx                  # Root component (orchestrates dashboard, editor, and modals)
    ├── main.tsx                 # React DOM mount point
    ├── types/
    │   └── resume.ts            # TypeScript interfaces for ResumeData, Experiences, Skills, etc.
    ├── data/
    │   └── defaultResumes.ts    # Seed data and starter profile presets
    └── components/
        ├── Navigation/
        │   └── Navbar.tsx       # FlowCV 4-phase header & action toolbar
        ├── Dashboard/
        │   └── ResumesDashboard.tsx # Resumes management dashboard
        ├── ResumeForm/          # Phase 1: Content forms
        │   ├── FormContainer.tsx
        │   ├── PersonalForm.tsx
        │   ├── SummaryForm.tsx
        │   ├── ExperienceForm.tsx
        │   ├── EducationForm.tsx
        │   ├── ProjectsForm.tsx
        │   ├── SkillsForm.tsx
        │   ├── AISkillSuggestions.tsx
        │   ├── TechStackTagInput.tsx
        │   ├── CertificationsForm.tsx
        │   └── LanguagesAndMoreForm.tsx
        ├── Design/              # Phase 2: Design studio
        │   └── DesignStudio.tsx
        ├── Check/               # Phase 3: ATS audit & health check
        │   └── ResumeChecker.tsx
        ├── Download/            # Phase 4: Download & export studio
        │   └── DownloadStudio.tsx
        ├── ResumePreview/       # Live A4 page renderer & preview
        │   └── ResumePreview.tsx
        └── Modals/              # Modal dialogs
            ├── ImportResumeModal.tsx
            ├── AIToolsModal.tsx
            ├── ATSScannerModal.tsx
            ├── CoverLetterModal.tsx
            ├── ExportModal.tsx
            ├── PresetPickerModal.tsx
            └── MyResumesModal.tsx
```

---

## License

This project is licensed under the Apache 2.0 License.
