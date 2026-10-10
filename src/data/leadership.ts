export interface LeadershipItem {
  id: number;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  color: string;
  icon: string;
}


export const experience: LeadershipItem[] = [
  {
    id: 1,
    role: "CHAKRAVYUHA CTF Organizer",
    organization: "Sanjivani University",
    location: "Kopargaon, Maharashtra",
    period: "2026",
    type: "Event",
    description:
      "Co-organized CHAKRAVYUHA, a Capture The Flag cybersecurity competition at Sanjivani University. Designed challenges covering web exploitation, cryptography, forensics, and OSINT for participants.",
    highlights: [
      "Designed CTF challenges across multiple categories",
      "Coordinated event logistics and team management",
      "Promoted cybersecurity awareness on campus",
    ],
    color: "from-emerald-500 to-teal-500",
    icon: "Flag",
  },
  {
    id: 2,
    role: "Head of SAP",
    organization: "Cyber Security Business Club (CSBC)",
    location: "Sanjivani University",
    period: "2026 – Present",
    type: "Club",
    description:
      "Serving as Head of Student Academic Programs at the Cyber Security Business Club (CSBC), Sanjivani University. Leading workshops, seminars, and academic initiatives to bridge industry skills and student learning.",
    highlights: [
      "Led academic programs and workshops",
      "Coordinated speaker sessions and seminars",
      "Guided junior members in cybersecurity fundamentals",
    ],
    color: "from-teal-500 to-cyan-500",
    icon: "Users",
  },
];
