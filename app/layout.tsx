import type { Metadata } from "next";
import localFont from "next/font/local";
import { PAGE_TITLE, PAGE_DESCRIPTION } from "@/configuration/ui";
import "../styles/globals.css";
import { ErrorWrapper } from "./parts/error/error-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import {ThemeProvider} from "next-themes"
import Sidebar from "@/components/chat/sidebar"
import "../public/tailwind.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0f172a] text-white">
        <ThemeProvider attribute="class">
          <div className="flex flex-col min-h-screen">
            {/* ✅ Top Header Bar */}
            <header className="bg-[#0f172a] text-white px-4 py-3 flex items-center justify-between">
              <h1 className="text-lg font-semibold">Veteran Transition Assistant</h1>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md">
                Clear Conversation
              </button>
            </header>

            <div className="flex flex-1">
              <Sidebar /> {/* ✅ Sidebar on the left */}
              <main className="flex-grow p-5">{children}</main>
            </div>

            {/* ✅ Footer */}
            <footer className="bg-[#0f172a] text-gray-400 text-center py-3 text-sm">
              <p>Created for MBA742 at UNC Kenan-Flagler</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
