"use client";

import { motion } from "framer-motion";
import { ExternalLink, Check, FolderGit2, Sparkles } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { projectsData } from "@/data/projects";
import { personalInfo } from "@/data/personal";

export default function Projects() {
  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="section-badge mb-3">
              <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Engineering &amp; Security Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Featured <span className="text-emerald-gradient">Projects</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Real-world systems, computer vision platforms, and security initiatives engineered with modern technologies.
            </p>
          </div>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <GitHubIcon className="w-4 h-4" />
            <span>View More on GitHub →</span>
          </a>
        </div>

        {/* Clean Responsive Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="cyber-card p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header / Project Number & Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-amber-400 tracking-widest">
                    PROJECT {project.projectNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      project.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                        : project.status === "In Progress"
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                        : "bg-teal-500/10 text-teal-300 border-teal-500/30"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Project Title & Subtitle */}
                <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-medium text-emerald-400 mb-3">
                  {project.subtitle}
                </p>

                {/* Short Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Functionality */}
                <div className="space-y-1.5 mb-5 pt-3 border-t border-white/[0.06]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Key Functionality:
                  </span>
                  {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-1.5 text-xs text-slate-300"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Technology Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="chip text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full py-2 text-xs"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
