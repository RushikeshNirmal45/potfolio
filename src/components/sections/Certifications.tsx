"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  ExternalLink,
  Maximize2,
  ShieldCheck,
  Search,
  Filter,
} from "lucide-react";
import {
  individualCertificates,
  linkedInCertificates,
  certificateCategories,
  CertificateCategory,
  CertificateItem,
} from "@/data/certificates";
import CertificateViewer from "@/components/ui/CertificateViewer";
import LinkedInLearningCarousel from "@/components/ui/LinkedInLearningCarousel";

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeViewerCert, setActiveViewerCert] = useState<CertificateItem | null>(null);

  // Combine all certificates for viewer navigation
  const allCertificates = useMemo(
    () => [...individualCertificates, ...linkedInCertificates],
    []
  );

  // Filter individual certificates based on category and search query
  const filteredIndividualCerts = useMemo(() => {
    return individualCertificates.filter((cert) => {
      const matchesCategory =
        selectedCategory === "ALL" || cert.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cert.skills &&
          cert.skills.some((s) =>
            s.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle active viewer index
  const activeViewerIndex = activeViewerCert
    ? allCertificates.findIndex((c) => c.id === activeViewerCert.id)
    : -1;

  const handlePrevViewer = () => {
    if (activeViewerIndex > 0) {
      setActiveViewerCert(allCertificates[activeViewerIndex - 1]);
    }
  };

  const handleNextViewer = () => {
    if (activeViewerIndex < allCertificates.length - 1) {
      setActiveViewerCert(allCertificates[activeViewerIndex + 1]);
    }
  };

  const showLinkedInCollection =
    selectedCategory === "ALL" || selectedCategory === "LINKEDIN LEARNING";

  return (
    <section id="certifications" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-badge mb-3">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Qualifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Certifications &amp; <span className="text-emerald-gradient">Credentials</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Authentic certifications awarded by Fortinet, Oracle, Linux Foundation, NASSCOM, Infosys, and LinkedIn Learning.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certificates or skills…"
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#090e17] border border-white/10 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0 hidden sm:inline-block" />
          {certificateCategories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/20"
                    : "bg-[#0b121f] text-slate-400 hover:text-slate-200 border border-white/[0.06]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* LinkedIn Learning Grouped Collection Card (Prominent when relevant) */}
        {showLinkedInCollection && searchQuery.trim() === "" && (
          <div className="mb-8">
            <LinkedInLearningCarousel
              onOpenCertificate={(cert) => setActiveViewerCert(cert)}
            />
          </div>
        )}

        {/* Individual Certificates Responsive Grid: 3 Desktop, 2 Tablet, 1 Mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndividualCerts.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="cyber-card p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Certificate Image Preview Container with object-fit: contain */}
                <div
                  className="relative aspect-[16/11] w-full rounded-xl bg-[#040609] border border-white/10 overflow-hidden mb-4 cursor-pointer group/img"
                  onClick={() => setActiveViewerCert(cert)}
                >
                  <Image
                    src={cert.preview}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-1.5 transition-transform duration-300 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 text-xs font-semibold text-white border border-white/20">
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                      Expand View
                    </span>
                  </div>
                </div>

                {/* Header: Provider & Year */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span className="font-semibold text-emerald-400 truncate max-w-[180px]">
                    {cert.issuer}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 shrink-0">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {cert.year}
                  </span>
                </div>

                {/* Real Certificate Title */}
                <h3 className="text-sm sm:text-base font-bold text-slate-100 line-clamp-2 leading-snug mb-3 group-hover:text-emerald-300 transition-colors">
                  {cert.title}
                </h3>

                {/* Skills tags */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-5">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="chip text-[10px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* View Certificate Button Aligned at Bottom */}
              <button
                onClick={() => setActiveViewerCert(cert)}
                className="btn-secondary w-full py-2 text-xs font-semibold mt-2"
                aria-label={`View Certificate: ${cert.title}`}
              >
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>View Certificate</span>
              </button>
            </motion.div>
          ))}
        </div>

        {filteredIndividualCerts.length === 0 && !showLinkedInCollection && (
          <div className="text-center py-16 cyber-card">
            <p className="text-slate-400 text-sm">
              No certificates match the selected filters.
            </p>
          </div>
        )}
      </div>

      {/* Modal / Lightbox Certificate Viewer */}
      <CertificateViewer
        certificate={activeViewerCert}
        onClose={() => setActiveViewerCert(null)}
        onPrev={handlePrevViewer}
        onNext={handleNextViewer}
        hasPrev={activeViewerIndex > 0}
        hasNext={activeViewerIndex < allCertificates.length - 1}
        currentIndex={activeViewerIndex}
        totalCount={allCertificates.length}
      />
    </section>
  );
}
