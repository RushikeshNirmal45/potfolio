"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Award, Calendar, CheckCircle2 } from "lucide-react";
import { CertificateItem, linkedInCertificates } from "@/data/certificates";

interface LinkedInLearningCarouselProps {
  onOpenCertificate: (cert: CertificateItem) => void;
}

export default function LinkedInLearningCarousel({
  onOpenCertificate,
}: LinkedInLearningCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCert = linkedInCertificates[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : linkedInCertificates.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < linkedInCertificates.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="cyber-card p-5 sm:p-6 border-emerald-500/25 bg-[#080d16] relative overflow-hidden">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0077B5]/15 border border-[#0077B5]/30 flex items-center justify-center text-[#0A66C2]">
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
              LinkedIn Learning
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                Collection
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              10 Verified Credentials &bull; Professional &amp; Cyber Skill Tracks
            </p>
          </div>
        </div>

        {/* Counter & Arrows */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-mono font-bold text-amber-400 px-2.5 py-1 rounded bg-slate-900 border border-white/10">
            {String(currentIndex + 1).padStart(2, "0")} / {String(linkedInCertificates.length).padStart(2, "0")}
          </span>
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-400 transition-colors"
            aria-label="Previous Certificate"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-400 transition-colors"
            aria-label="Next Certificate"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 2-Column Content: Left Details, Right Image Preview */}
      <div className="grid md:grid-cols-12 gap-5 items-center">
        {/* Left Column: Details & Action */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-1.5">
              <span className="text-emerald-400 font-semibold">{currentCert.issuer}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Calendar className="w-3 h-3 text-slate-400" />
                {currentCert.dateStr}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-slate-100 leading-snug mb-2">
              {currentCert.title}
            </h4>

            {currentCert.skills && currentCert.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {currentCert.skills.map((skill) => (
                  <span key={skill} className="chip text-[10px]">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Verified credential issued via LinkedIn Learning platform.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-2.5">
            <button
              onClick={() => onOpenCertificate(currentCert)}
              className="btn-primary text-xs py-2 px-4 flex items-center gap-2"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>View Full Certificate</span>
            </button>
          </div>
        </div>

        {/* Right Column: Compact Certificate Preview Thumbnail */}
        <div className="md:col-span-6">
          <div
            onClick={() => onOpenCertificate(currentCert)}
            className="relative h-44 sm:h-52 md:h-56 lg:h-60 w-full rounded-xl bg-[#040609] border border-white/10 overflow-hidden group cursor-pointer flex items-center justify-center p-2 hover:border-emerald-500/40 transition-colors"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCert.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentCert.preview}
                  alt={currentCert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-xs font-semibold text-white border border-white/20 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                Click to Expand
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

