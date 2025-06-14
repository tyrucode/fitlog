import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Fitness Logging app created using NextJS",
};

// ROOT LAYOUT 
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <header>
        <nav> {/*put navbar here, sidebar below */}</nav>
      </header>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {children}
      </body>
      <footer> {/*put footer here */}</footer>
    </html>
  );
}
