import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
            <div className="container flex h-14 items-center">
              <div className="mr-4 flex">
                <Link className="mr-6 flex items-center space-x-2" href="/">
                  <span className="font-bold text-xl">Eighty20</span>
                </Link>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <div className="w-full flex-1 md:w-auto md:w-auto">
                  <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
                      Dashboard
                    </Link>
                    <Link href="/tasks" className="transition-colors hover:text-foreground/80 text-foreground/60">
                      Tasks
                    </Link>
                    <Link href="/analytics" className="transition-colors hover:text-foreground/80 text-foreground/60">
                      Analytics
                    </Link>
                  </nav>
                </div>
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