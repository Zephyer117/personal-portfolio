import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only load when needed
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only load when needed
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "MS Utsho - Full Stack Web Developer",
    template: "%s | MS Utsho Portfolio",
  },
  description: "Professional portfolio of MS Utsho - Full Stack Web Developer based in Khulna, Bangladesh. Specializing in Next.js, React, TypeScript, and modern web development technologies.",
  keywords: ["Web Developer", "Full Stack Developer", "Next.js", "React", "TypeScript", "Portfolio", "Khulna", "Bangladesh", "Web Development", "Frontend", "Backend"],
  authors: [{ name: "MS Utsho" }],
  creator: "MS Utsho",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MS Utsho Portfolio",
    title: "MS Utsho - Full Stack Web Developer",
    description: "Professional portfolio of MS Utsho - Full Stack Web Developer",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MS Utsho Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MS Utsho - Full Stack Web Developer",
    description: "Professional portfolio of MS Utsho - Full Stack Web Developer",
    images: ["/og-image.jpg"],
    creator: "@msutsho",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
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
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
