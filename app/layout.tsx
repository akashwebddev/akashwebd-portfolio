import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingWrapper from "@/components/LoadingWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "akashwebd | Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Creating scalable solutions with clean code and beautiful designs.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "Web Development",
    "Frontend",
    "Backend",
    "JavaScript",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
  ],
  authors: [{ name: "akashwebd", url: "https://akashwebd.dev" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akashwebd.dev",
    siteName: "akashwebd",
    title: "akashwebd | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "akashwebd | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%2300d4ff' font-weight='bold' font-family='monospace'>&lt;/&gt;</text></svg>" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <LoadingWrapper />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

