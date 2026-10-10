export interface EducationItem {
  id: string;
  degree: string;
  specialization?: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  status: "Ongoing" | "Completed";
  description: string;
  highlights: string[];
}

export const educationData: EducationItem[] = [
  {
    id: "btech-cse",
    degree: "B.Tech Computer Science Engineering",
    specialization: "Cyber Security",
    institution: "SANJIVANI UNIVERSITY",
    location: "Kopargaon, Maharashtra",
    period: "2025 – 2029",
    score: "8.82 / 10",
    scoreLabel: "First Year CGPA",
    status: "Ongoing",
    description:
      "Core focus on Cybersecurity fundamentals, network defense, penetration testing, cryptography, secure software design, and applied artificial intelligence.",
    highlights: [
      "Specialization in Cyber Security",
      "First Year CGPA: 8.82 / 10",
      "Department of Cyber Security & CSBC Member",
      "Active CTF Participant & Organizer",
    ],
  },
  {
    id: "hsc-science",
    degree: "Higher Secondary Certificate (HSC)",
    specialization: "Science",
    institution: "Maharashtra State Board",
    location: "Maharashtra, India",
    period: "2024 – 2025",
    score: "65.67%",
    scoreLabel: "HSC Aggregate",
    status: "Completed",
    description:
      "Completed Higher Secondary Education in the Science stream with foundations in Mathematics, Physics, and Computer Science.",
    highlights: ["Science Stream", "Mathematics & Physics Foundation"],
  },
  {
    id: "ssc-distinction",
    degree: "Secondary School Certificate (SSC)",
    institution: "Maharashtra State Board",
    location: "Maharashtra, India",
    period: "2022 – 2023",
    score: "91.80%",
    scoreLabel: "SSC Distinction",
    status: "Completed",
    description:
      "Graduated secondary education with Distinction, demonstrating academic excellence across science and analytical disciplines.",
    highlights: ["91.80% Distinction", "Top Academic Performance"],
  },
];
