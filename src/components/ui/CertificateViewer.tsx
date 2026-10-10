"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ExternalLink, Download, ShieldCheck, Award } from "lucide-react";
import { CertificateItem } from "@/data/certificates";

interface CertificateViewerProps {
  certificate: CertificateItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalCount?: number;
}

export default function CertificateViewer({
  certificate,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex,
  totalCount,
}: CertificateViewerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev && hasPrev) onPrev();
      if (e.key === "ArrowRight" && onNext && hasNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    if (!certificate) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, handleKeyDown]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate Viewer: ${certificate.title}`}
    >
      <div
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-[#090e17] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-[#060a10]">
          <div className="flex items-center gap-2.5 truncate pr-3">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="truncate">
              <h3 className="text-sm font-bold text-slate-100 truncate">
                {certificate.title}
              </h3>
              <p className="text-[11px] text-slate-400 truncate">
                {certificate.issuer} • {certificate.year}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {currentIndex !== undefined && totalCount !== undefined && (
              <span className="text-xs font-mono text-slate-400 hidden sm:inline-block px-2 py-1 bg-slate-900 rounded border border-white/5">
                {currentIndex + 1} / {totalCount}
              </span>
            )}

            <a
              href={certificate.preview}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Open / Download Full Resolution"
              aria-label="Download Certificate"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
              aria-label="Close Certificate Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Image Display Area */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[500px] bg-[#040609] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
          <div className="relative w-full h-full min-h-[300px] sm:min-h-[500px]">
            <Image
              src={certificate.preview}
              alt={certificate.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
              priority
            />
          </div>

          {/* Navigation Controls: Previous */}
          {hasPrev && onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-emerald-500 hover:text-slate-950 text-white border border-white/10 shadow-lg transition-all"
              aria-label="Previous Certificate"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Navigation Controls: Next */}
          {hasNext && onNext && (
            <button
              onClick={onNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-emerald-500 hover:text-slate-950 text-white border border-white/10 shadow-lg transition-all"
              aria-label="Next Certificate"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Bottom Details Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-white/[0.08] bg-[#060a10] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-slate-400">
              Provider: <strong className="text-slate-200">{certificate.issuer}</strong>
            </span>
            {certificate.dateStr && (
              <span className="text-slate-400">
                Date: <span className="text-slate-200">{certificate.dateStr}</span>
              </span>
            )}
            {certificate.credentialId && (
              <span className="text-slate-400 font-mono">
                Credential ID: <span className="text-emerald-400">{certificate.credentialId}</span>
              </span>
            )}
          </div>

          {certificate.skills && certificate.skills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {certificate.skills.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-white/5 text-[10px]">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
