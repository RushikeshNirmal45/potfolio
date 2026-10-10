"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Code2,
  Cpu,
  Lightbulb,
  GraduationCap,
  MapPin,
  Award,
  FileCheck2,
} from "lucide-react";
import { personalInfo } from "@/data/personal";
import { individualCertificates, linkedInCertificates } from "@/data/certificates";
import { projectsData } from "@/data/projects";

const capabilities = [
  {
    id: "cyber-security",
    title: "Cyber Security",
    desc: "Ethical hacking, penetration testing, secure systems and security fundamentals.",
    icon: ShieldCheck,
    accent: "emerald",
  },
  {
    id: "software-dev",
    title: "Software Development",
    desc: "Modern web development, React, Next.js and Python.",
    icon: Code2,
    accent: "amber",
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    desc: "Exploring AI, machine learning, computer vision and AI-powered solutions.",
    icon: Cpu,
    accent: "teal",
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    desc: "Breaking complex problems into practical and efficient solutions.",
    icon: Lightbulb,
    accent: "cyan",
  },
];

export default function About() {
  const verifiedCertCount = individualCertificates.length + linkedInCertificates.length;
  const projectCount = projectsData.length;

  const stats = [
    { value: personalInfo.cgpa, label: "First Year CGPA", subtext: "Scale: 10.0" },
    { value: "2nd Year", label: "B.Tech CSE", subtext: "Cyber Security Spec." },
    { value: `${verifiedCertCount}+`, label: "Certificates", subtext: "100% Verified Credentials" },
    { value: `${projectCount}+`, label: "Projects", subtext: "AI & Full-Stack" },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-badge mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Profile &amp; Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            About <span className="text-emerald-gradient">Me</span>
          </h2>
        </div>

        {/* Two-Column Layout on Desktop */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Left Column: Professional Introduction (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 flex flex-col space-y-5"
          >
            <div className="cyber-card p-6 sm:p-7">
              <h3 className="text-xl font-bold text-slate-100 mb-3">
                Engineering Secure Digital Foundations
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                I am <strong className="text-slate-100 font-semibold">{personalInfo.fullName}</strong>, an aspiring
                cybersecurity researcher and software developer currently pursuing my Second Year of B.Tech in
                Computer Science Engineering (Cyber Security) at{" "}
                <strong className="text-emerald-400 font-semibold">{personalInfo.university}</strong>.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                My technical pursuits revolve around understanding offensive attack vectors to construct stronger defensive
                architectures, creating reliable web systems, and exploring artificial intelligence for real-world impact.
              </p>

              {/* Institution & Location Meta */}
              <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-200">{personalInfo.university}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <FileCheck2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Second Year B.Tech CSE (Cyber Security)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Four Premium Capability Cards (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
          >
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.id}
                  className="cyber-card p-5 sm:p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-colors">
                        <Icon className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-500 group-hover:text-amber-400 transition-colors">
                        0{i + 1}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-100 mb-2 group-hover:text-emerald-300 transition-colors">
                      {cap.title}
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Compact Statistics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="cyber-card p-5 text-center flex flex-col items-center justify-center"
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-accent-gradient font-mono tracking-tight mb-1">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-200">
                {stat.label}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {stat.subtext}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
