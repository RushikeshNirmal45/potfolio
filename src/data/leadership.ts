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

export const leadership: LeadershipItem[] = [
  {
    id: 1,
    role: "Stage Management Lead",
    organization: "Sanjivani University",
    location: "Kopargaon, Maharashtra",
    period: "2025 – Present",
    type: "Leadership",
    description:
      "Leading stage management, technical coordination, and audio-visual setups for college events, national conferences, and cultural fests.",
    highlights: [
      "Directed stage flow and timeline execution for major university fests",
      "Coordinated with student organizers, guest dignitaries, and technical crew",
      "Managed sound, lighting, and presentation logistics under real-time constraints",
    ],
    color: "from-purple-500 to-indigo-500",
    icon: "Music",
  },
  {
    id: 2,
    role: "Student Coordinator & Volunteer",
    organization: "Tech & Security Community",
    location: "Sanjivani University",
    period: "2024 – Present",
    type: "Volunteering",
    description:
      "Actively mentoring junior peers in cybersecurity fundamentals, Linux CLI navigation, and introductory ethical hacking practices.",
    highlights: [
      "Mentored peers in practical cybersecurity labs and CTF fundamentals",
      "Facilitated peer-to-peer technical learning sessions",
      "Assisted faculty and guest speakers during campus technical symposiums",
    ],
    color: "from-indigo-500 to-purple-600",
    icon: "Sparkles",
  },
];
