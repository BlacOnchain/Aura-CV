import React, { useRef, useState, useEffect } from 'react';
import { ResumeData, TemplateStyle, PageMargin } from '../../types/resume';
import { ExecutiveModernTemplate } from './ExecutiveModernTemplate';
import { MinimalistTechTemplate } from './MinimalistTechTemplate';
import { ClassicElegantTemplate } from './ClassicElegantTemplate';
import { SplitSidebarTemplate } from './SplitSidebarTemplate';
import { FlowModernaTemplate } from './FlowModernaTemplate';
import { FlowCompactTemplate } from './FlowCompactTemplate';
import { FlowNordicTemplate } from './FlowNordicTemplate';
import { FlowCreativeTemplate } from './FlowCreativeTemplate';
import { ServiceModernTemplate } from './ServiceModernTemplate';
import { ClinicalMinimalTemplate } from './ClinicalMinimalTemplate';
import { CreativeBoldTemplate } from './CreativeBoldTemplate';
import { ImpactHospitalityTemplate } from './ImpactHospitalityTemplate';
import { ModernAcademicTemplate } from './ModernAcademicTemplate';
import {
  Printer,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layout,
  Wand2,
  FileSpreadsheet,
  ChevronDown,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface Props {
  data: ResumeData;
  onOpenATS: () => void;
  onOpenCoverLetter: () => void;
  onOpenAITools?: () => void;
  onUpdateTemplate?: (template: TemplateStyle) => void;
  onUpdateSpacing?: (spacing: PageMargin) => void;
  onAutoFitOnePage?: () => void;
}

export const ResumePreview: React.FC<Props> = ({
  data,
  onOpenATS,
  onOpenCoverLetter,
  onOpenAITools,
  onUpdateTemplate,
  onUpdateSpacing,
  onAutoFitOnePage,
}) => {
  const resumeContainerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [pageViewMode, setPageViewMode] = useState<'paged' | 'continuous'>('continuous');
  const [estimatedPages, setEstimatedPages] = useState<number>(1);
  const [contentHeight, setContentHeight] = useState<number>(1123);
  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (viewportRef.current) {
        const parentWidth = viewportRef.current.clientWidth - 48; // subtract padding
        if (parentWidth < 820) {
          // Keep a minimum scale of 0.85 on desktop/tablet to maintain comfortable reading size, and 0.5 on mobile
          const minLimit = window.innerWidth < 640 ? 0.5 : 0.85;
          setAutoScale(Math.max(minLimit, parentWidth / 820));
        } else {
          setAutoScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(handleResize, 150);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Approximate standard A4 height in 96 DPI CSS pixels (approx 1123px)
  const A4_HEIGHT_PX = 1123;

  // Measure content height and calculate page count & fill budget
  useEffect(() => {
    const updateMetrics = () => {
      if (resumeContainerRef.current) {
        const height = resumeContainerRef.current.scrollHeight;
        setContentHeight(height);
        const pages = Math.max(1, Math.ceil(height / (A4_HEIGHT_PX - 20)));
        setEstimatedPages(pages);
      }
    };

    updateMetrics();
    const timer = setTimeout(updateMetrics, 200);
    return () => clearTimeout(timer);
  }, [data, zoomLevel, pageViewMode]);

  // Page 1 fill calculation
  const page1FillPercent = Math.min(
    100,
    Math.round((contentHeight / A4_HEIGHT_PX) * 100)
  );
  const isOverflowingPage1 = contentHeight > A4_HEIGHT_PX + 20;

  const handlePrint = () => {
    window.print();
  };

  const handleFitToWindow = () => {
    // Automatically pick an ideal zoom level
    const screenWidth = window.innerWidth;
    if (screenWidth < 1024) {
      setZoomLevel(65);
    } else if (screenWidth < 1440) {
      setZoomLevel(80);
    } else {
      setZoomLevel(95);
    }
  };

  const renderTemplate = () => {
    switch (data.settings.template) {
      case 'modern-tech':
        return <MinimalistTechTemplate data={data} />;
      case 'classic':
        return <ClassicElegantTemplate data={data} />;
      case 'sidebar':
        return <SplitSidebarTemplate data={data} />;
      case 'flow-moderna':
        return <FlowModernaTemplate data={data} />;
      case 'flow-compact':
        return <FlowCompactTemplate data={data} />;
      case 'flow-nordic':
        return <FlowNordicTemplate data={data} />;
      case 'flow-creative':
        return <FlowCreativeTemplate data={data} />;
      case 'service-modern':
        return <ServiceModernTemplate data={data} />;
      case 'clinical-minimal':
        return <ClinicalMinimalTemplate data={data} />;
      case 'creative-bold':
        return <CreativeBoldTemplate data={data} />;
      case 'impact-hospitality':
        return <ImpactHospitalityTemplate data={data} />;
      case 'modern-academic':
        return <ModernAcademicTemplate data={data} />;
      case 'executive':
      default:
        return <ExecutiveModernTemplate data={data} />;
    }
  };

  const templatesList: { id: TemplateStyle; name: string; tag: string }[] = [
    { id: 'flow-moderna', name: 'Aura Moderna', tag: 'Design-Forward' },
    { id: 'flow-compact', name: 'Aura Compact 1-Page', tag: 'High Density' },
    { id: 'flow-nordic', name: 'Nordic Clean', tag: 'Minimalist' },
    { id: 'flow-creative', name: 'Creative Accent Rail', tag: 'Visual Accent' },
    { id: 'service-modern', name: 'Service Professional', tag: 'Hospitality & Retail' },
    { id: 'clinical-minimal', name: 'Clinical Minimal', tag: 'Healthcare' },
    { id: 'creative-bold', name: 'Bold Impact', tag: 'Marketing & Sales' },
    { id: 'impact-hospitality', name: 'Impact Hospitality', tag: 'Service & Retail' },
    { id: 'modern-academic', name: 'Modern Academic', tag: 'Formal & Research' },
    { id: 'executive', name: 'Executive Modern', tag: 'Corporate' },
    { id: 'modern-tech', name: 'Minimalist Tech', tag: 'ATS Standard' },
    { id: 'classic', name: 'Classic Editorial Serif', tag: 'Formal & Law' },
    { id: 'sidebar', name: 'Split Executive', tag: '2-Column Split' },
  ];

  const currentTemplateName =
    templatesList.find((t) => t.id === data.settings.template)?.name || 'Executive Modern';

  const accentColor = data.settings.accentColor || '#059669';
  const finalScale = (zoomLevel / 100) * autoScale;

  return (
    <div className="flex flex-col h-full bg-[#F7F2E8] overflow-hidden relative">
      {/* Sheet Canvas Viewport */}
      <div
        ref={viewportRef}
        className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center pb-24"
      >
        {/* Page Container */}
        <div
          style={{
            width: `${820 * finalScale}px`,
            height: `${(contentHeight + 20) * finalScale}px`,
            overflow: 'visible',
          }}
          className="relative transition-all duration-150"
        >
          <div
            style={{
              transform: `scale(${finalScale})`,
              transformOrigin: 'top center',
              width: '820px',
              position: 'absolute',
              top: 0,
              left: '50%',
              marginLeft: '-410px',
            }}
            className="transition-transform duration-150"
          >
            {/* Main Paper Sheet */}
            <div
              key={data.settings.template}
              ref={resumeContainerRef}
              id="printable-resume"
              className={`w-full bg-white rounded-xs shadow-md transition-all relative overflow-hidden print:shadow-none print:m-0 print:p-0 print:w-full print:max-w-none animate-paper-landing ${
                pageViewMode === 'paged' ? 'border border-[#EBE6DD] ring-1 ring-black/5' : ''
              }`}
              style={{
                minHeight: `${A4_HEIGHT_PX}px`,
              }}
            >
            {renderTemplate()}

            {/* Visual Page Break Indicator Line (FlowCV Style) in Paged Mode */}
            {pageViewMode === 'paged' && estimatedPages > 1 && (
              <>
                {Array.from({ length: estimatedPages - 1 }).map((_, pIdx) => {
                  const cutPositionPx = (pIdx + 1) * A4_HEIGHT_PX;
                  return (
                    <div
                      key={pIdx}
                      style={{ top: `${cutPositionPx}px` }}
                      className="no-print absolute left-0 right-0 pointer-events-none z-20 flex items-center justify-between"
                    >
                      <div className="w-full border-b border-dashed border-rose-300 relative">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold shadow-xs select-none">
                          --- A4 Page {pIdx + 1} Cut / Page {pIdx + 2} Start ---
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          </div>

          {/* Page Indicators Footer */}
          {pageViewMode === 'paged' && (
            <div className="no-print mt-3.5 flex items-center justify-between text-xs text-zinc-500 px-2">
              <span className="flex items-center gap-1.5 font-medium">
                <FileSpreadsheet className="w-3.5 h-3.5 text-zinc-400" />
                Standard A4 Page Ratio ({estimatedPages} {estimatedPages === 1 ? 'Page' : 'Pages'})
              </span>
              <span className="text-[11px] text-zinc-400">
                {isOverflowingPage1
                  ? 'Tip: Toggle Compact Margins in Design Studio to fit on 1 page'
                  : 'Perfect 1-page presentation · Recruiter approved'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Control Capsule Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 no-print bg-[#FCF9F5]/95 backdrop-blur-md border border-[#EBE6DD] rounded-3xl px-4.5 py-2.5 flex items-center gap-5 shadow-lg z-30 text-xs text-[#1A1917]">
        {/* Real-Time Page Budget Meter (Recreation of pasted image layout) */}
        <div className="flex items-center gap-2.5 border-r border-[#EBE6DD] pr-4 select-none">
          <div
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              !isOverflowingPage1 ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
            }`}
          />
          <div className="flex flex-col text-[#1A1917]/90 text-[10.5px] font-bold uppercase tracking-wider leading-tight">
            {!isOverflowingPage1 ? (
              <>
                <span>Page</span>
                <span className="text-[#10B981]">{page1FillPercent}%</span>
                <span className="text-[9px] text-[#1A1917]/50 lowercase font-normal">filled</span>
              </>
            ) : (
              <>
                <span className="text-[#F59E0B] font-extrabold">{estimatedPages}</span>
                <span>Pages</span>
              </>
            )}
          </div>

          {isOverflowingPage1 && onAutoFitOnePage && (
            <button
              type="button"
              onClick={onAutoFitOnePage}
              className="flex flex-col text-left text-amber-600 hover:text-amber-700 border-l border-[#EBE6DD] pl-3.5 cursor-pointer leading-tight font-extrabold text-[10.5px] uppercase tracking-wider"
            >
              <span className="underline decoration-1 underline-offset-2">Fit 1</span>
              <span className="underline decoration-1 underline-offset-2">Page</span>
            </button>
          )}
        </div>

        {/* Paged vs Scroll Segmented Control */}
        <div className="bg-[#EBE6DD]/40 p-0.5 rounded-full flex items-center gap-0.5 border border-[#EBE6DD]/60">
          <button
            type="button"
            onClick={() => setPageViewMode('paged')}
            className={`px-3.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
              pageViewMode === 'paged'
                ? 'bg-[#1A1917] text-white shadow-xs'
                : 'text-[#1A1917]/60 hover:text-zinc-900'
            }`}
          >
            Paged
          </button>
          <button
            type="button"
            onClick={() => setPageViewMode('continuous')}
            className={`px-3.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
              pageViewMode === 'continuous'
                ? 'bg-[#1A1917] text-white shadow-xs'
                : 'text-[#1A1917]/60 hover:text-zinc-900'
            }`}
          >
            Scroll
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-[#EBE6DD]/30 px-1.5 py-0.5 rounded-full border border-[#EBE6DD]/40">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
            disabled={zoomLevel <= 50}
            className="w-6 h-6 flex items-center justify-center rounded-full text-[#1A1917]/60 hover:bg-[#EBE6DD]/60 hover:text-[#1A1917] disabled:opacity-30 cursor-pointer font-bold text-sm transition-colors"
          >
            -
          </button>
          <span className="min-w-[34px] text-center text-[11px] font-bold">{zoomLevel}%</span>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
            disabled={zoomLevel >= 130}
            className="w-6 h-6 flex items-center justify-center rounded-full text-[#1A1917]/60 hover:bg-[#EBE6DD]/60 hover:text-[#1A1917] disabled:opacity-30 cursor-pointer font-bold text-sm transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
