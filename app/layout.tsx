import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wojciech Lubkowski",
  description:
    "Portfolio of Wojciech Lubkowski — CS @ UMBC, full-stack developer, and software engineer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-950 text-white min-h-screen antialiased`}
      >
        {/* Soft blue/purple gradient background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900" />

        <div className="max-w-5xl mx-auto px-6 py-8">
          <Navbar />
          {children}
          <footer className="mt-16 text-xs text-gray-500 border-t border-gray-800 pt-4">
            © {new Date().getFullYear()} Wojciech Lubkowski
          </footer>
        </div>
      </body>
    </html>
  );
}
