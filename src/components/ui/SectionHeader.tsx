"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  label,
  title,
  highlight,
  description,
  centered = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`mb-14 ${centered ? "text-center" : ""}`}
    >
      {/* Label */}
      <span className="section-label block mb-3">{label}</span>

      {/* Heading */}
      <h2 className="section-title mb-4">
        {title}{" "}
        {highlight && <span className="gradient-text-blue">{highlight}</span>}
      </h2>

      {/* Accent line */}
      <div className={`heading-line ${centered ? "mx-auto" : ""} mb-5`} />

      {/* Description */}
      {description && (
        <p
          className={`text-[#94A3B8] text-base leading-relaxed max-w-xl ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
