"use client";

import { motion } from "framer-motion";
import {
  Flag, Users, Music, MapPin, Calendar, ChevronRight,
  Sparkles, Trophy,
} from "lucide-react";
import { leadership, experience } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Flag,
  Users,
  Music,
  Trophy,
  Sparkles,
};

function getIcon(name: string): React.ElementType {
  return iconMap[name] ?? Sparkles;
}

export default function Leadership() {
  return (
    <section id="leadership" className="section-padding relative">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      {/* Subtle ambient blobs */}
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-purple-500/[0.04] blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-cyan-500/[0.04] blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="section-label mb-1">CAMPUS & COMMUNITY</p>
          <h2 className="text-2xl font-extrabold text-white">
            Leadership &amp;{" "}
            <span className="gradient-text-blue">Campus Involvement</span>
          </h2>
        </motion.div>

        {/* ── Two column grid: Experience | Leadership ── */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── Experience Column ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#06B6D4] mb-5 flex items-center gap-2"
            >
              <span className="w-6 h-px bg-[#06B6D4]" />
              Experience
            </motion.p>

            <div className="flex flex-col gap-4">
              {experience.map((item, i) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3 }}
                    className="glass-card rounded-2xl overflow-hidden border border-[#3B82F6]/10 hover:border-[#3B82F6]/30 transition-all duration-300 group"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}
                  >
                    {/* Top gradient accent */}
                    <div className={`h-[3px] bg-gradient-to-r ${item.color}`} />

                    <div className="p-5">
                      {/* Row 1: icon + title */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-white font-bold text-[14px] leading-snug">
                              {item.role}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border"
                              style={{ background: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.25)", color: "#94A3B8" }}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-[#06B6D4] font-semibold text-[12px] mt-0.5">
                            {item.organization}
                          </p>
                        </div>
                      </div>

                      {/* Meta row */}
                      <div className="flex flex-wrap gap-3 mb-3 text-[11px] text-[#64748B]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 shrink-0" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {item.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[#94A3B8] text-[12.5px] leading-relaxed mb-3">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-1.5">
                        {item.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-[#94A3B8] text-[11.5px]">
                            <ChevronRight className="w-3 h-3 text-[#06B6D4] shrink-0 mt-0.5" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Leadership Column ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400 mb-5 flex items-center gap-2"
            >
              <span className="w-6 h-px bg-purple-400" />
              Leadership
            </motion.p>

            <div className="flex flex-col gap-4">
              {leadership.map((item, i) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3 }}
                    className="glass-card rounded-2xl overflow-hidden border border-purple-500/15 hover:border-purple-500/35 transition-all duration-300 group"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}
                  >
                    <div className={`h-[3px] bg-gradient-to-r ${item.color}`} />

                    <div className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-white font-bold text-[14px] leading-snug">
                              {item.role}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border"
                              style={{ background: "rgba(139,92,246,0.08)", borderColor: "rgba(139,92,246,0.25)", color: "#94A3B8" }}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-purple-400 font-semibold text-[12px] mt-0.5">
                            {item.organization}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-3 text-[11px] text-[#64748B]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 shrink-0" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {item.location}
                        </span>
                      </div>

                      <p className="text-[#94A3B8] text-[12.5px] leading-relaxed mb-3">
                        {item.description}
                      </p>

                      <ul className="space-y-1.5">
                        {item.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-[#94A3B8] text-[11.5px]">
                            <ChevronRight className="w-3 h-3 text-purple-400 shrink-0 mt-0.5" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}

              {/* Involvement summary card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.55 }}
                className="glass-card rounded-2xl border border-white/[0.07] p-5"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
              >
                <h4 className="text-white font-bold text-[13px] mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Quick Summary
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "2+", label: "Events Organized", color: "text-[#06B6D4]" },
                    { value: "Head", label: "SAP Role at CSBC", color: "text-purple-400" },
                    { value: "Stage", label: "Management Lead", color: "text-amber-400" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className={`text-xl font-extrabold ${s.color} leading-none mb-1`}>{s.value}</div>
                      <div className="text-[#64748B] text-[9.5px] leading-tight font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
