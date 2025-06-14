//default imports
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

//components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer" //use when its ready

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
      <Navbar />
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {children}
      </body>
      <footer> {/*put footer here */}</footer>
    </html>
  );
}
