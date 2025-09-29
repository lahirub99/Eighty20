import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Eighty20 - Personal Productivity App",
  description: "A productivity app that combines the Eisenhower Matrix with the 80/20 Rule to help you focus on what matters most.",
  keywords: ["productivity", "eisenhower matrix", "80/20 rule", "task management", "personal productivity"],
  authors: [{ name: "Eighty20 Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4 sm:px-6">
              {/* Logo with icon */}
              <div className="flex items-center space-x-3">
                <Link className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity" href="/">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-sm sm:text-lg shadow-lg">
                    E
                  </div>
                  <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Eighty20
                  </span>
                </Link>
              </div>
              
              {/* Navigation tabs */}
              <div className="flex flex-1 items-center justify-center">
                <Navigation />
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with Next.js, TypeScript, and Tailwind CSS. Following the 80/20 principle.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}