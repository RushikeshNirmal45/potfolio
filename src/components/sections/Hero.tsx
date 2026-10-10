"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Mail, ArrowRight, Shield, Award, Terminal } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import RoleRotator from "@/components/ui/RoleRotator";
import { personalInfo } from "@/data/personal";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* 1. Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>{personalInfo.roleBadge}</span>
            </div>

            {/* 2. Main Heading with Large Premium Typography */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight leading-[1.05] mb-4">
              <span>Rushikesh</span>
              <br />
              <span className="text-accent-gradient drop-shadow-sm">
                Nirmal
              </span>
            </h1>

            {/* 3. Dynamic Typing/Rotating Role Line */}
            <div className="mb-6">
              <RoleRotator />
            </div>

            {/* 4. Hero Description */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mb-8 font-normal">
              Second Year B.Tech Computer Science Engineering (Cyber Security)
              student at <span className="text-slate-100 font-semibold">{personalInfo.university}</span>,
              passionate about Cyber Security, Software Development, AI and
              solving real-world problems with technology.
            </p>

            {/* 5. Hero Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              <a
                href={personalInfo.resumeFile}
                download="Rushikesh_Nirmal_Resume.pdf"
                className="btn-primary w-full sm:w-auto text-sm"
                aria-label="Download Rushikesh Nirmal Resume"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </a>

              <button
                onClick={() => handleScrollTo("contact")}
                className="btn-secondary w-full sm:w-auto text-sm"
                aria-label="Contact Rushikesh Nirmal"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>CONTACT ME</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* 6. Verified Social Links */}
            <div className="flex items-center gap-4 pt-2 border-t border-white/[0.08] w-full justify-center lg:justify-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Connect:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rushikesh Nirmal GitHub Profile"
                  className="p-2 rounded-lg bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Rushikesh Nirmal LinkedIn Profile"
                  className="p-2 rounded-lg bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  aria-label="Send Email to Rushikesh Nirmal"
                  className="p-2 rounded-lg bg-slate-900/60 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Photo Showcase (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Subtle Ambient Back-Glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-amber-500/15 to-teal-500/20 blur-xl opacity-75" />

              {/* Main Card Frame */}
              <div className="relative rounded-2xl bg-[#090e17] border border-white/10 p-3 shadow-2xl overflow-hidden">
                {/* Photo container */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-950">
                  <Image
                    src={personalInfo.profileImage}
                    alt="Rushikesh Nirmal - Cyber Security Student"
                    fill
                    priority
                    sizes="(max-width: 640px) 340px, 380px"
                    className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                  />
                  {/* Subtle gradient shadow at base of image for readability of overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090e17] via-[#090e17]/60 to-transparent" />

                  {/* Security Verification Tag overlay at bottom */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-lg bg-[#060a10]/80 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Shield className="w-3.5 h-3.5" />
                        <span>B.Tech CSE (Cyber Security)</span>
                      </div>
                      <span className="text-amber-400 font-bold font-mono">
                        CGPA {personalInfo.cgpa}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mt-1 truncate">
                      {personalInfo.university}
                    </p>
                  </div>
                </div>

                {/* Card Sub-Bar: Tactical Highlights */}
                <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between px-2 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-emerald-400" />
                    Kopargaon, India
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Award className="w-3 h-3 text-amber-400" />
                    15+ Verified Certs
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
