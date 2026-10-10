export interface SkillCategory {
  id: string;
  category: string;
  iconName: string;
  accent: "emerald" | "amber" | "teal" | "cyan";
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    category: "PROGRAMMING",
    iconName: "Code2",
    accent: "emerald",
    description: "Core algorithms, systems scripting, and application logic.",
    skills: ["Python", "JavaScript", "TypeScript", "C", "C++", "Bash"],
  },
  {
    id: "cyber-security",
    category: "CYBER SECURITY",
    iconName: "ShieldAlert",
    accent: "amber",
    description: "Offensive security tools, vulnerability analysis, and defensive fundamentals.",
    skills: [
      "Ethical Hacking",
      "Penetration Testing",
      "OWASP Top 10",
      "Nmap",
      "Wireshark",
      "Metasploit",
    ],
  },
  {
    id: "linux",
    category: "LINUX",
    iconName: "Terminal",
    accent: "teal",
    description: "Command-line environments, distributions, and server maintenance.",
    skills: ["Kali Linux", "Ubuntu", "Bash Scripting", "System Administration"],
  },
  {
    id: "networking",
    category: "NETWORKING",
    iconName: "Network",
    accent: "cyan",
    description: "Packet flow analysis, routing protocols, and perimeter defense.",
    skills: [
      "TCP/IP",
      "DNS",
      "Firewalls",
      "VPN",
      "IDS/IPS",
      "Network Protocols",
    ],
  },
  {
    id: "web-development",
    category: "WEB DEVELOPMENT",
    iconName: "Layout",
    accent: "emerald",
    description: "Modern component-driven web architectures and responsive interfaces.",
    skills: ["HTML", "CSS", "React", "Next.js", "Node.js", "REST APIs"],
  },
  {
    id: "ai-machine-learning",
    category: "AI & MACHINE LEARNING",
    iconName: "Cpu",
    accent: "amber",
    description: "Vision intelligence, predictive pipelines, and generative workflows.",
    skills: [
      "Python ML",
      "Data Analysis",
      "OpenCV",
      "AI Tools",
      "Prompt Engineering",
    ],
  },
  {
    id: "tools-devops",
    category: "TOOLS & DEVOPS",
    iconName: "Wrench",
    accent: "teal",
    description: "Version control, container basics, testing, and debugging toolsets.",
    skills: ["Git", "GitHub", "VS Code", "Docker", "Postman", "Burp Suite"],
  },
  {
    id: "databases",
    category: "DATABASES",
    iconName: "Database",
    accent: "cyan",
    description: "Relational modeling, document storage, and embedded databases.",
    skills: ["MySQL", "MongoDB", "SQLite", "PostgreSQL", "Firebase"],
  },
];
