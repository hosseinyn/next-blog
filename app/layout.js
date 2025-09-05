import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import Header from "./components/Header";
import Footer from "./components/Footer";

import SessionProviderComponent from "./components/SessionProviderComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next Blog",
  description: "A full-stack nextjs blog by hosseinyn",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderComponent><Header /></SessionProviderComponent>

        <SessionProviderComponent>{children}</SessionProviderComponent>

        <Footer />
      </body>
    </html>
  );
}
