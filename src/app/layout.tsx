import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import GlobalBackground from "@/components/ui/GlobalBackground";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rushikesh Nirmal | Cyber Security Student & Developer",
  description:
    "Portfolio of Rushikesh Nirmal, a Cyber Security student and developer interested in cybersecurity, software development, AI and problem solving.",
  keywords: [
    "Rushikesh Nirmal",
    "Cyber Security",
    "Software Developer",
    "Ethical Hacking",
    "CTF",
    "SANJIVANI UNIVERSITY",
    "AI Enthusiast",
    "Computer Science Engineering",
  ],
  authors: [{ name: "Rushikesh Valmik Nirmal" }],
  creator: "Rushikesh Nirmal",
  openGraph: {
    title: "Rushikesh Nirmal | Cyber Security Student & Developer",
    description:
      "Portfolio of Rushikesh Nirmal, a Cyber Security student and developer interested in cybersecurity, software development, AI and problem solving.",
    url: "https://github.com/RushikeshNirmal45",
    siteName: "Rushikesh Nirmal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rushikesh Nirmal | Cyber Security Student & Developer",
    description:
      "Portfolio of Rushikesh Nirmal, a Cyber Security student and developer interested in cybersecurity, software development, AI and problem solving.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen text-slate-100 bg-[#050708] antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
        <GlobalBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
