"use client";
import { useState } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navigation */}
        <header className="bg-blue-500 text-white">
          <nav className="container mx-auto flex items-center justify-between p-4">
            <Link href="/" className="text-lg font-bold">
              Risikoscore Dashboard
            </Link>
            {/* Burger-Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            {/* Menüs */}
            <div
              className={`${
                menuOpen ? "block" : "hidden"
              } absolute lg:static top-16 left-0 w-full bg-blue-500 lg:bg-transparent lg:flex lg:space-x-8`}
            >
              {/* Menü für Ansichten */}
              <ul className="lg:flex lg:space-x-4">
                <li className="p-2 lg:p-0">
                  <Link href="/dashboard" className="hover:underline block">
                    Dashboard
                  </Link>
                </li>
                <li className="p-2 lg:p-0">
                  <Link href="/detailanalyse" className="hover:underline block">
                    Detailanalyse
                  </Link>
                </li>
                <li className="p-2 lg:p-0">
                  <Link href="/" className="hover:underline block">
                    Schwachstellendatenbank
                  </Link>
                </li>
              </ul>
              {/* Menü für Risikoscores */}
              <ul className="lg:flex lg:space-x-4 mt-4 lg:mt-0">
                <li className="p-2 lg:p-0 relative group">
                  <span className="hover:underline block cursor-pointer">
                    Information zu Risikoscores
                  </span>
                  <ul className="hidden group-hover:block absolute bg-blue-600 text-white rounded shadow-md mt-2">
                    <li className="p-2">
                      <Link href="/cvss" className="hover:underline block">
                        CVSS
                      </Link>
                    </li>
                    <li className="p-2">
                      <Link href="/epss" className="hover:underline block">
                        EPSS
                      </Link>
                    </li>
                    <li className="p-2">
                      <Link href="/ssvc" className="hover:underline block">
                        SSVC
                      </Link>
                    </li>
                    <li className="p-2">
                      <Link href="/vpr" className="hover:underline block">
                        VPR
                      </Link>
                    </li>
                    <li className="p-2">
                      <Link href="/combined" className="hover:underline block">
                        Combined
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        {/* Hauptinhalt */}
        <main className="container mx-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-4">
          &copy; {new Date().getFullYear()} CVE Dashboard
        </footer>
      </body>
    </html>
  );
}
