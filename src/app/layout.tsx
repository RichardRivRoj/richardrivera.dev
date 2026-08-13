import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Richard Rivera | Systems Engineer, Full Stack Developer & Professor",
  description: "Official portfolio of Richard Rivera: Systems Engineer, Full Stack Developer, University Professor, and Researcher. Building technology solutions that create real impact.",
  keywords: [
    "Richard Rivera",
    "Systems Engineer",
    "Full Stack Developer",
    "Professor",
    "Researcher",
    "Python Developer",
    "Laravel Developer",
    "Next.js Developer"
  ],
  authors: [{ name: "Richard Rivera" }],
  openGraph: {
    title: "Richard Rivera | Systems Engineer, Full Stack Developer & Professor",
    description: "Discover the professional projects, academic research, and pedagogical work of Richard Rivera.",
    url: "https://richardrivera.dev",
    siteName: "Richard Rivera Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Richard Rivera | Systems Engineer & Developer",
    description: "Official portfolio of Richard Rivera: Systems Engineer, Full Stack Developer, University Professor, and Researcher.",
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
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col transition-colors duration-200">
        <LanguageProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
