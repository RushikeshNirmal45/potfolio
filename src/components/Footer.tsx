"use client";

import { Mail, ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { personalInfo } from "@/data/personal";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#040609]/95 text-slate-400 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-base font-bold text-slate-100 tracking-tight">
              Rushikesh Nirmal
            </span>
            <span className="text-xs text-emerald-400 font-medium mt-0.5">
              B.Tech CSE — Cyber Security
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              {personalInfo.location}
            </span>
          </div>

          {/* Social Icons & Back-to-Top */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rushikesh Nirmal on GitHub"
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rushikesh Nirmal on LinkedIn"
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email Rushikesh Nirmal"
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal Copyright */}
        <div className="mt-8 pt-6 border-t border-white/[0.05] text-center text-[11px] text-slate-500">
          <p>© 2026 Rushikesh Nirmal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
