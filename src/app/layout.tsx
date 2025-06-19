//default imports
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

//components
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer" //use when its ready
//context
import { UserProvider } from "@/context/UserContext";

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
      <body
        className={`${geistSans.variable} subpixel-antialiased font-semibold`}
      >
        <UserProvider>
          <header>
            <Navbar />
          </header>
          <main className="min-h-screen">
            {children}

          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
