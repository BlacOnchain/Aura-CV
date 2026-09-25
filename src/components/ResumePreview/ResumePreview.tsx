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
    const updateScale = () => {
      if (viewportRef.current) {
        const containerWidth = viewportRef.current.clientWidth;
        const containerHeight = viewportRef.current.clientHeight;

        const isMobile = window.innerWidth < 640;
        const paddingX = isMobile ? 16 : 48;
        const paddingY = isMobile ? 24 : 48;

        const availW = Math.max(180, containerWidth - paddingX);
        const availH = Math.max(250, containerHeight - paddingY);

        const widthScale = availW / 820;
        // Calculate height-based scale if height is constrained
        const pageHeight = contentHeight || A4_HEIGHT_PX;
        const heightScale = availH / pageHeight;

        // On mobile or height-constrained views, pick proportional fit
        let fitScale = widthScale;
        if (isMobile || containerHeight < 600) {
          fitScale = Math.min(widthScale, heightScale * 1.05);
        }

        const minFloor = isMobile ? 0.3 : 0.45;
        const boundedScale = Math.min(1.1, Math.max(minFloor, fitScale));
        setAutoScale(boundedScale);
      }
    };

    updateScale();

    let resizeObserver: ResizeObserver | null = null;
    if (viewportRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateScale();
      });
      resizeObserver.observe(viewportRef.current);
    }

    window.addEventListener('resize', updateScale);
    const timer = setTimeout(updateScale, 150);

    return () => {
      window.removeEventListener('resize', updateScale);
      if (resizeObserver) resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, [contentHeight]);

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
    <div className="flex flex-col h-full bg-zinc-100/90 overflow-hidden relative">
      {/* Sheet Canvas Viewport */}
      <div
        ref={viewportRef}
        className="flex-1 overflow-auto p-3 sm:p-6 lg:p-8 flex items-center justify-center pb-28 scroll-smooth min-h-0"
      >
        {/* Page Container Wrapper - Always Centered */}
        <div
          style={{
            width: `${820 * finalScale}px`,
            minHeight: `${(contentHeight + 20) * finalScale}px`,
          }}
          className="relative flex flex-col justify-center items-center transition-all duration-200 shrink-0 my-auto mx-auto"
        >
          <div
            style={{
              transform: `scale(${finalScale})`,
              transformOrigin: 'center center',
              width: '820px',
            }}
            className="transition-transform duration-200 shrink-0 shadow-xl rounded-xs"
          >
            {/* Main Paper Sheet */}
            <div
              key={data.settings.template}
              ref={resumeContainerRef}
              id="printable-resume"
              className={`w-full bg-white rounded-xs shadow-md transition-all relative overflow-hidden print:shadow-none print:m-0 print:p-0 print:w-full print:max-w-none animate-paper-landing ${
                pageViewMode === 'paged' ? 'border border-zinc-200 ring-1 ring-black/5' : ''
              }`}
              style={{
                minHeight: `${A4_HEIGHT_PX}px`,
              }}
            >
            {renderTemplate()}

            {/* Visual Page Break Indicator Line in Paged Mode */}
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
            <div className="no-print mt-3.5 flex items-center justify-between text-xs text-zinc-500 px-2 w-full">
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 no-print bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-full px-4 py-2 flex items-center gap-4 shadow-xl z-30 text-xs text-zinc-900">
        {/* Real-Time Page Budget Meter */}
        <div className="flex items-center gap-2 border-r border-zinc-200 pr-3.5 select-none">
          <div
            className={`w-2 h-2 rounded-full shrink-0 ${
              !isOverflowingPage1 ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
          />
          <div className="flex flex-col text-zinc-800 text-[10px] font-mono font-bold uppercase tracking-wider leading-tight">
            {!isOverflowingPage1 ? (
              <>
                <span className="text-emerald-600">{page1FillPercent}% Filled</span>
              </>
            ) : (
              <>
                <span className="text-amber-600">{estimatedPages} Pages</span>
              </>
            )}
          </div>

          {isOverflowingPage1 && onAutoFitOnePage && (
            <button
              type="button"
              onClick={onAutoFitOnePage}
              className="text-amber-700 hover:text-amber-900 border-l border-zinc-200 pl-3 cursor-pointer text-[10px] font-mono font-bold uppercase tracking-wider underline underline-offset-2"
            >
              Fit 1 Page
            </button>
          )}
        </div>

        {/* Paged vs Scroll Segmented Control */}
        <div className="bg-zinc-100 p-0.5 rounded-full flex items-center gap-0.5 border border-zinc-200">
          <button
            type="button"
            onClick={() => setPageViewMode('paged')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              pageViewMode === 'paged'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Paged
          </button>
          <button
            type="button"
            onClick={() => setPageViewMode('continuous')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              pageViewMode === 'continuous'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            Scroll
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200 text-xs">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(40, z - 10))}
            disabled={zoomLevel <= 40}
            className="w-5 h-5 flex items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950 disabled:opacity-30 cursor-pointer font-bold text-xs transition-colors"
            title="Zoom Out"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(100)}
            className="min-w-[32px] text-center text-[10px] font-mono font-semibold text-zinc-700 hover:text-zinc-950 cursor-pointer"
            title="Reset Zoom to 100%"
          >
            {zoomLevel}%
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
            disabled={zoomLevel >= 140}
            className="w-5 h-5 flex items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950 disabled:opacity-30 cursor-pointer font-bold text-xs transition-colors"
            title="Zoom In"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
