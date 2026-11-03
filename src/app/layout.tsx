import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider, themeNoFlashScript } from "@/components/theme/ThemeProvider";
import { Splash } from "@/components/splash/Splash";
import { splashSessionScript, splashReleaseScript } from "@/components/splash/splashScript";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
export const metadata: Metadata = { title: "Hashem Mdoukh — Front-End Engineer · React & Next.js", description: "Front-End Engineer building fast, scalable, accessible web applications with React, Next.js & TypeScript." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeNoFlashScript }} />
        <script dangerouslySetInnerHTML={{ __html: splashSessionScript }} />
        {/* the overlay lifts on its own, but the skip button cannot work without JS */}
        <noscript>
          <style>{`#splash-skip{display:none}`}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} ${jetbrains.variable}`}>
        <Splash />
        <div id="page-root" suppressHydrationWarning>
          <ThemeProvider>{children}</ThemeProvider>
        </div>
        <script dangerouslySetInnerHTML={{ __html: splashReleaseScript }} />
      </body>
    </html>
  );
}
