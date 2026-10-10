"use client";

import { motion } from "framer-motion";
import {
  Code2,
  ShieldAlert,
  Terminal,
  Network,
  Layout,
  Cpu,
  Wrench,
  Database,
  Layers,
} from "lucide-react";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  ShieldAlert,
  Terminal,
  Network,
  Layout,
  Cpu,
  Wrench,
  Database,
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-badge mb-3">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Skills &amp; <span className="text-accent-gradient">Technologies</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            Structured skillsets categorized across cybersecurity, software development, and computing systems.
          </p>
        </div>

        {/* 8 Grouped Category Cards in a Responsive Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((cat, index) => {
            const Icon = iconMap[cat.iconName] ?? Code2;

            const isAmber = cat.accent === "amber";
            const isTeal = cat.accent === "teal";
            const isCyan = cat.accent === "cyan";

            const accentBorder = isAmber
              ? "group-hover:border-amber-500/40"
              : isTeal
              ? "group-hover:border-teal-500/40"
              : isCyan
              ? "group-hover:border-cyan-500/40"
              : "group-hover:border-emerald-500/40";

            const iconBg = isAmber
              ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
              : isTeal
              ? "text-teal-400 bg-teal-500/10 border-teal-500/20"
              : isCyan
              ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
              : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={`cyber-card p-5 flex flex-col justify-between group ${accentBorder}`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${iconBg}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                        {cat.category}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {cat.skills.length} skills
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug mb-4">
                    {cat.description}
                  </p>

                  {/* Compact Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
