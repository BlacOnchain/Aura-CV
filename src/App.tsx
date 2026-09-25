/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeData, SavedResume } from './types/resume';
import { useAuth } from './components/Auth/AuthContext';
import { LandingPage } from './components/Landing/LandingPage';
import { useSync } from './hooks/useSync';
import { 
  SOFTWARE_ENGINEER_RESUME, 
  PRODUCT_MANAGER_RESUME, 
  BLANK_RESUME,
} from './data/defaultResumes';
import { Navbar, FlowTab } from './components/Navigation/Navbar';
import { MobileNav } from './components/Navigation/MobileNav';
import { MobileToolSheet } from './components/Navigation/MobileToolSheet';
import { ResumesDashboard } from './components/Dashboard/ResumesDashboard';
import { FormContainer } from './components/ResumeForm/FormContainer';
import { DesignStudio } from './components/Design/DesignStudio';
import { ResumeChecker } from './components/Check/ResumeChecker';
import { DownloadStudio } from './components/Download/DownloadStudio';
import { ResumePreview } from './components/ResumePreview/ResumePreview';
import { UtilityRail } from './components/Navigation/UtilityRail';

// Full View Tools
import { AIToolsView } from './components/Tools/AIToolsView';
import { ATSScannerView } from './components/Tools/ATSScannerView';
import { CoverLetterView } from './components/Tools/CoverLetterView';
import { ImportView } from './components/Tools/ImportView';
import { MyResumesView } from './components/Tools/MyResumesView';
import { DatabaseView } from './components/Tools/DatabaseView';
import { AccountView } from './components/Tools/AccountView';
import { AuthPage } from './components/Auth/AuthPage';

// Small Modals
import { ExportModal } from './components/Modals/ExportModal';
import { PresetPickerModal } from './components/Modals/PresetPickerModal';
import { PrivacyPolicyModal } from './components/Legal/PrivacyPolicyModal';
import { TermsModal } from './components/Legal/TermsModal';
import { CookieConsentBanner } from './components/Legal/CookieConsentBanner';
import { NotFoundPage } from './components/Common/NotFoundPage';
import { useDocumentMetadata } from './hooks/useDocumentMetadata';

const STORAGE_KEY_RESUMES = 'auracv_resumes_v1';
const STORAGE_KEY_ACTIVE_ID = 'auracv_active_id_v1';
const STORAGE_KEY_VIEW = 'auracv_app_view_v1';

export type ToolView = 'ai-tools' | 'ats-scanner' | 'cover-letter' | 'import' | 'my-resumes' | 'database' | 'account';

const INITIAL_RESUMES: SavedResume[] = [
  {
    id: 'cv-swe-demo',
    name: 'Professional Profile',
    targetRole: 'Senior Technical Lead',
    lastModified: Date.now(),
    data: SOFTWARE_ENGINEER_RESUME,
  },
];

export default function App() {
  const { user, loading } = useAuth();
  const [authView, setAuthView] = useState<'landing' | 'login' | 'register'>('landing');
  const [appView, setAppView] = useState<'dashboard' | 'editor'>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_VIEW);
      if (stored === 'dashboard' || stored === 'editor') return stored;
    } catch (_) {}
    return 'dashboard'; 
  });

  const [editorTab, setEditorTab] = useState<FlowTab>('content');
  const [activeTool, setActiveTool] = useState<ToolView | null>(null);

  const [savedResumes, setSavedResumes] = useState<SavedResume[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_RESUMES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_RESUMES;
  });

  const [activeResumeId, setActiveResumeId] = useState<string>(() => {
    try {
      const storedId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);
      if (storedId && savedResumes.some((r) => r.id === storedId)) return storedId;
    } catch (e) {}
    return savedResumes[0]?.id || INITIAL_RESUMES[0].id;
  });

  const activeSavedResume = savedResumes.find((r) => r.id === activeResumeId) || savedResumes[0] || INITIAL_RESUMES[0];
  const [resumeData, setResumeData] = useState<ResumeData>(activeSavedResume.data);
  const [viewMode, setViewMode] = useState<'edit' | 'split' | 'preview'>('split');

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Dynamic semantic metadata per tool view
  const currentViewKey = !user 
    ? (authView === 'landing' ? 'landing' : 'account')
    : (activeTool ? activeTool : (appView === 'editor' ? 'editor' : 'landing'));

  useDocumentMetadata(currentViewKey);

  useSync(savedResumes);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_VIEW, appView);
  }, [appView]);

  useEffect(() => {
    const target = savedResumes.find((r) => r.id === activeResumeId);
    if (target) setResumeData(target.data);
  }, [activeResumeId]);

  useEffect(() => {
    const updatedList = savedResumes.map((r) =>
      r.id === activeResumeId
        ? { ...r, lastModified: Date.now(), targetRole: resumeData.personal.title || r.targetRole, data: resumeData }
        : r
    );
    localStorage.setItem(STORAGE_KEY_RESUMES, JSON.stringify(updatedList));
    localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeResumeId);
    setSaveIndicator(true);
    const timer = setTimeout(() => setSaveIndicator(false), 1500);
    return () => clearTimeout(timer);
  }, [resumeData, activeResumeId]);

  const handleUpdateSettings = (settingsPartial: Partial<ResumeData['settings']>) => {
    setResumeData((prev) => ({ ...prev, settings: { ...prev.settings, ...settingsPartial } }));
  };

  const handleEditResume = (id: string) => {
    setActiveResumeId(id);
    setAppView('editor');
  };

  const handleCreateNewResume = (name: string, templateData: ResumeData = BLANK_RESUME) => {
    const newId = `cv-${Date.now()}`;
    const newResume: SavedResume = {
      id: newId,
      name,
      targetRole: templateData.personal.title || 'New Role',
      lastModified: Date.now(),
      data: { ...templateData, title: name },
    };
    const nextList = [newResume, ...savedResumes];
    setSavedResumes(nextList);
    setActiveResumeId(newId);
    setAppView('editor');
    setEditorTab('content');
  };

  const handleDuplicateResume = (id: string) => {
    const source = savedResumes.find((r) => r.id === id);
    if (!source) return;
    const newId = `cv-${Date.now()}`;
    const cloned = { ...source, id: newId, name: `${source.name} (Copy)`, lastModified: Date.now() };
    setSavedResumes([cloned, ...savedResumes]);
    setActiveResumeId(newId);
  };

  const handleRenameResume = (id: string, newName: string) => {
    setSavedResumes((prev) => prev.map((r) => (r.id === id ? { ...r, name: newName } : r)));
  };

  const handleDeleteResume = (id: string) => {
    if (savedResumes.length <= 1) return;
    const remaining = savedResumes.filter((r) => r.id !== id);
    setSavedResumes(remaining);
    if (activeResumeId === id) setActiveResumeId(remaining[0].id);
  };

  const handleClearDatabase = () => {
    setSavedResumes([INITIAL_RESUMES[0]]);
    setActiveResumeId(INITIAL_RESUMES[0].id);
    setAppView('dashboard');
  };

  const handleAutoFitOnePage = () => {
    handleUpdateSettings({ pageMargin: 'compact', compactSpacing: true, fontSize: 'small' });
  };

  const handleImportAsNew = (name: string, data: ResumeData) => handleCreateNewResume(name, data);
  const handleImportOverwrite = (data: ResumeData) => setResumeData(data);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-zinc-900/10 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <AnimatePresence mode="wait">
        {authView === 'landing' ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <LandingPage onStart={(mode) => setAuthView(mode || 'register')} />
          </motion.div>
        ) : (
          <motion.div key="auth" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <AuthPage onBack={() => setAuthView('landing')} initialMode={authView === 'login' ? 'login' : 'register'} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col font-body text-[#1A1917] selection:bg-zinc-900 selection:text-white overflow-hidden relative">
      {/* Dynamic Ambient Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 no-print">
        <div className="absolute top-[20%] left-[10%] w-[450px] h-[450px] rounded-full bg-[#EBE6DD]/25 blur-[120px] animate-float-blob-1" />
        <div className="absolute bottom-[30%] right-[15%] w-[500px] h-[500px] rounded-full bg-[#D6CFBC]/20 blur-[130px] animate-float-blob-2" />
        <div className="absolute top-[50%] left-[45%] w-[350px] h-[350px] rounded-full bg-orange-100/10 blur-[100px] animate-pulse-glow" />
      </div>

      <AnimatePresence mode="wait">
        {appView === 'dashboard' ? (
          <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="flex-1 overflow-y-auto relative z-10">
            <ResumesDashboard
              resumes={savedResumes}
              activeResumeId={activeResumeId}
              onSelectResume={setActiveResumeId}
              onEditResume={handleEditResume}
              onCreateResume={handleCreateNewResume}
              onDuplicateResume={handleDuplicateResume}
              onDeleteResume={handleDeleteResume}
              onRenameResume={handleRenameResume}
              onOpenCoverLetter={() => { setAppView('editor'); setActiveTool('cover-letter'); }}
              onOpenImportModal={() => { setAppView('editor'); setActiveTool('import'); }}
            />
          </motion.div>
        ) : (
          <motion.div key="editor" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.99 }} transition={{ duration: 0.4 }} className="flex flex-col h-screen overflow-hidden relative z-10">
            <Navbar
              data={resumeData}
              activeResumeName={activeSavedResume.name}
              activeTab={editorTab}
              onChangeActiveTab={(tab) => { setEditorTab(tab); setActiveTool(null); }}
              onBackToDashboard={() => { setAppView('dashboard'); setActiveTool(null); }}
              onRenameResume={(newName) => handleRenameResume(activeResumeId, newName)}
              onOpenAITools={() => setActiveTool('ai-tools')}
              onOpenImport={() => setActiveTool('import')}
              onSelectPalette={(hex) => handleUpdateSettings({ accentColor: hex })}
              viewMode={viewMode}
              onChangeViewMode={setViewMode}
              onDownloadPdf={() => window.print()}
              isSaved={saveIndicator}
            />
            <main className="flex-1 flex relative overflow-hidden">
              <UtilityRail activeTool={activeTool} onSelectTool={setActiveTool} />
              <div className={`h-full overflow-y-auto border-r border-[#EBE6DD] bg-[#FAF6F0] transition-all duration-500 scroll-smooth ${viewMode === 'edit' ? 'flex-1' : viewMode === 'preview' ? 'hidden' : 'flex-1 lg:flex-none lg:w-1/2'}`}>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeTool || editorTab} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    transition={{ duration: 0.3 }}
                    className="h-full px-4 pt-8"
                  >
                    {activeTool ? (
                       <div className="h-full">
                         {activeTool === 'ai-tools' && <AIToolsView resumeData={resumeData} onUpdateResume={setResumeData} onOpenATS={() => setActiveTool('ats-scanner')} onOpenCoverLetter={() => setActiveTool('cover-letter')} onBack={() => setActiveTool(null)} />}
                         {activeTool === 'ats-scanner' && <ATSScannerView resumeData={resumeData} onBack={() => setActiveTool(null)} />}
                         {activeTool === 'cover-letter' && <CoverLetterView resumeData={resumeData} onBack={() => setActiveTool(null)} />}
                         {activeTool === 'import' && <ImportView onImportAsNew={handleImportAsNew} onOverwriteCurrent={handleImportOverwrite} onBack={() => setActiveTool(null)} />}
                         {activeTool === 'my-resumes' && <MyResumesView resumes={savedResumes} activeResumeId={activeResumeId} onSelectResume={setActiveResumeId} onEditResume={handleEditResume} onCreateResume={handleCreateNewResume} onDuplicateResume={handleDuplicateResume} onDeleteResume={handleDeleteResume} onRenameResume={handleRenameResume} onBack={() => setActiveTool(null)} />}
                         {activeTool === 'database' && <DatabaseView savedResumes={savedResumes} onClearDatabase={handleClearDatabase} onBack={() => setActiveTool(null)} />}
                         {activeTool === 'account' && <AccountView onBack={() => setActiveTool(null)} />}
                         {!['ai-tools', 'ats-scanner', 'cover-letter', 'import', 'my-resumes', 'database', 'account'].includes(activeTool) && (
                           <NotFoundPage onReturnHome={() => setActiveTool(null)} />
                         )}
                       </div>
                    ) : (
                      <div className="max-w-3xl mx-auto w-full pb-32">
                        {editorTab === 'content' && <FormContainer data={resumeData} onChange={setResumeData} />}
                        {editorTab === 'design' && <DesignStudio data={resumeData} onChangeSettings={handleUpdateSettings} onAutoFitOnePage={handleAutoFitOnePage} />}
                        {editorTab === 'check' && <ResumeChecker data={resumeData} onOpenAITools={() => setActiveTool('ai-tools')} onAutoFitOnePage={handleAutoFitOnePage} onSwitchTab={setEditorTab} />}
                        {editorTab === 'download' && <DownloadStudio data={resumeData} onOpenCoverLetter={() => setActiveTool('cover-letter')} onImportData={setResumeData} />}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className={`h-full overflow-hidden bg-[#F7F2E8] transition-all duration-500 ${viewMode === 'preview' ? 'flex-1' : viewMode === 'edit' ? 'hidden' : 'hidden lg:block lg:flex-1'}`}>
                <ResumePreview
                  data={resumeData}
                  onOpenATS={() => setActiveTool('ats-scanner')}
                  onOpenCoverLetter={() => setActiveTool('cover-letter')}
                  onOpenAITools={() => setActiveTool('ai-tools')}
                  onUpdateTemplate={(tpl) => handleUpdateSettings({ template: tpl })}
                  onUpdateSpacing={(sp) => handleUpdateSettings({ pageMargin: sp, compactSpacing: sp === 'compact' })}
                  onAutoFitOnePage={handleAutoFitOnePage}
                />
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isExportOpen && <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} resumeData={resumeData} onImportData={setResumeData} />}
        {isPresetsOpen && <PresetPickerModal isOpen={isPresetsOpen} onClose={() => setIsPresetsOpen(false)} onSelectPreset={(p) => { setResumeData(p); setIsPresetsOpen(false); }} />}
      </AnimatePresence>
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <CookieConsentBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      <MobileNav activeTab={editorTab} onTabChange={(tab) => { setEditorTab(tab); setActiveTool(null); }} onOpenTools={() => setIsMobileToolsOpen(true)} />
      <MobileToolSheet isOpen={isMobileToolsOpen} onClose={() => setIsMobileToolsOpen(false)} onSelectTool={setActiveTool} />
    </div>
  );
}
