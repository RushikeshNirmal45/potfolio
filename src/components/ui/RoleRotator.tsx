"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/data/personal";

export default function RoleRotator() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = personalInfo.roles[roleIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        // Typing
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 65);
      } else {
        // Pause at full word
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        // Deleting
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 35);
      } else {
        // Move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <div className="flex items-center gap-2 min-h-[32px] sm:min-h-[38px]">
      <span className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-emerald-400 font-mono">
        {displayText}
      </span>
      <span className="inline-block w-2 h-5 sm:h-6 bg-amber-400 animate-pulse rounded-xs" />
    </div>
  );
}
