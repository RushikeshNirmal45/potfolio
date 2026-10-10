export interface ProjectItem {
  id: string;
  projectNumber: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  keyFeatures: string[];
  githubUrl: string;
  liveUrl?: string | null;
  status: "Completed" | "In Progress" | "Competition";
  featuredBadge?: string;
  category: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "driver-mate",
    projectNumber: "01",
    title: "DriverMate",
    subtitle: "AI-Powered Driver Safety & Drowsiness Detection System",
    description:
      "A real-time driver fatigue and distraction detection system built using computer vision and machine learning. Analyzes ocular landmark movements, blink frequency, and head posture to issue low-latency alerts, mitigating highway fatigue incidents.",
    technologies: ["Python", "OpenCV", "TensorFlow", "Flask", "React", "WebSocket"],
    keyFeatures: [
      "Real-time Eye Aspect Ratio (EAR) ocular telemetry",
      "Yawn and head pose distraction classification",
      "Sub-100ms auditory warning triggering via WebSocket",
      "Responsive live telemetry monitoring interface",
    ],
    githubUrl: "https://github.com/RushikeshNirmal45",
    liveUrl: null,
    status: "In Progress",
    featuredBadge: "AI & Computer Vision",
    category: "AI & Machine Learning",
  },
  {
    id: "owasp-vulnerability-assessment",
    projectNumber: "02",
    title: "OWASP Top 10 Security Assessment",
    subtitle: "Web Application Vulnerability Analysis & Security Auditing",
    description:
      "Systematic penetration testing and vulnerability assessment lab targeting OWASP Top 10 web flaws including SQL injection, cross-site scripting (XSS), broken access control, and authentication weaknesses with automated detection scripts.",
    technologies: [
      "Python",
      "Burp Suite",
      "OWASP ZAP",
      "SQLMap",
      "Linux",
      "Bash",
    ],
    keyFeatures: [
      "Targeted vulnerability scanning against OWASP Top 10 standards",
      "Automated payload delivery and flaw verification scripting",
      "Remediation guidelines and security patching documentation",
      "Comprehensive laboratory penetration audit findings",
    ],
    githubUrl: "https://github.com/RushikeshNirmal45/Task_04-Web-Application-Vulnerability-Assessment-OWASP-Top-10-",
    liveUrl: null,
    status: "Completed",
    featuredBadge: "Vulnerability Assessment",
    category: "Cyber Security",
  },
  {
    id: "network-recon-audit",
    projectNumber: "03",
    title: "Network Recon & Port Audit",
    subtitle: "Automated Network Reconnaissance & Security Scanning",
    description:
      "Network reconnaissance framework and port scanning tool utilizing Nmap scripting and Python automation to discover hosts, identify running services, map network topologies, and highlight exposed services.",
    technologies: [
      "Python",
      "Nmap",
      "Wireshark",
      "TCP/IP",
      "Bash",
      "Linux",
    ],
    keyFeatures: [
      "Automated subnet sweep and active host discovery",
      "Service and OS banner fingerprinting routines",
      "Packet capture analysis and protocol inspection with Wireshark",
      "Actionable security posture report generation",
    ],
    githubUrl: "https://github.com/RushikeshNirmal45/Task_03-Network-Reconnaissance-Port-Scanning-Audit",
    liveUrl: null,
    status: "Completed",
    featuredBadge: "Network Security",
    category: "Cyber Security",
  },
  {
    id: "crypto-key-management",
    projectNumber: "04",
    title: "Cryptographic Key & Secure Auth",
    subtitle: "Encryption Protocol Implementation & Key Lifecycle Management",
    description:
      "Practical cryptographic system implementing asymmetric and symmetric encryption schemes, secure key generation, hash verification, and token-based authentication workflows for confidentiality and integrity.",
    technologies: [
      "Python",
      "Cryptography",
      "AES-256",
      "RSA",
      "SHA-256",
      "JWT",
    ],
    keyFeatures: [
      "AES-256 symmetric cipher encryption and decryption",
      "RSA public/private key-pair generation and signing",
      "HMAC integrity verification and secure token generation",
      "Role-based authentication architecture enforcement",
    ],
    githubUrl: "https://github.com/RushikeshNirmal45/Task_05-Cryptography-Key-Management-Secure-Auth",
    liveUrl: null,
    status: "Completed",
    featuredBadge: "Cryptography",
    category: "Cyber Security",
  },
  {
    id: "portfolio-architecture",
    projectNumber: "05",
    title: "Cyber Security Portfolio",
    subtitle: "Executive Personal Platform & Credential Architecture",
    description:
      "A high-performance personal portfolio built from the ground up for a Cyber Security student. Features custom design tokens, responsive certificate lightbox modal, grouped LinkedIn Learning interactive carousel, and strict privacy controls.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide Icons",
    ],
    keyFeatures: [
      "Bespoke near-black, emerald, and warm amber cyber design system",
      "Full modal lightbox for technical certificate verification",
      "Compact interactive multi-certificate LinkedIn Learning carousel",
      "Strict data privacy with zero plain-text phone exposure",
    ],
    githubUrl: "https://github.com/RushikeshNirmal45",
    liveUrl: null,
    status: "Completed",
    featuredBadge: "Full-Stack Security",
    category: "Web & Systems",
  },
  {
    id: "chakravyuha-ctf",
    projectNumber: "06",
    title: "CHAKRAVYUHA CTF Challenges",
    subtitle: "University-Level Cyber Security Capture The Flag Competition",
    description:
      "Co-organized and authored CTF challenges for Sanjivani University's premier cybersecurity event. Designed multi-stage scenarios spanning web vulnerabilities, network packet analysis, steganography, and cryptographic cipher cracking.",
    technologies: [
      "Kali Linux",
      "Wireshark",
      "Nmap",
      "Burp Suite",
      "Cryptography",
      "Python",
    ],
    keyFeatures: [
      "Crafted web penetration vectors (SQLi, IDOR, XSS)",
      "Authored network forensic pcap analysis tracks",
      "Coordinated campus-wide student cyber competition",
      "Fostered competitive security culture and CTF awareness",
    ],
    githubUrl: "https://github.com/RushikeshNirmal45",
    liveUrl: null,
    status: "Competition",
    featuredBadge: "Capture The Flag",
    category: "Cyber Security",
  },
];
