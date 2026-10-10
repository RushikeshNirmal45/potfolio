"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, CheckCircle2, MapPin } from "lucide-react";
import { educationData } from "@/data/education";

export default function Education() {
  return (
    <section id="education" className="py-20 lg:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center sm:text-left">
          <div className="section-badge mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            My <span className="text-emerald-gradient">Education</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            Formal technical education and academic progression in Computer Science and Cybersecurity.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-emerald-500/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Icon */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-7 h-7 rounded-full bg-[#050708] border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              {/* Education Card */}
              <div className="cyber-card p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </span>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      item.status === "Ongoing"
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                        : "bg-slate-800 text-slate-300 border-white/10"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-1">
                  {item.degree}
                </h3>

                {item.specialization && (
                  <p className="text-sm font-semibold text-amber-400 mb-2">
                    Specialization: {item.specialization}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mb-3 font-medium">
                  <span className="text-slate-100 font-bold uppercase tracking-wider">
                    {item.institution}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {item.location}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.scoreLabel}:</span>
                  <strong className="text-slate-100 font-bold font-mono">{item.score}</strong>
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
                  {item.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-900/60 px-2.5 py-1 rounded-md border border-white/5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
