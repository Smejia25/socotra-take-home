"use client";

import type { Metadata } from "next";
import { Inter, Raleway, Roboto, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Stepper from "@/components/stepper";
import { InsuranceFormContextProvider } from "@/providers/InsuranceFormProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["700", "500", "400"],
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} ${raleway.variable}  ${space_grotesk.variable}`}
    >
      <body>
        <div className="inline-block w-full h-36 bg-gradient-to-r from-secondary to-primary">
          <Image
            color="white"
            src="/socotraLogo.svg"
            alt="Socotra Logo"
            width={337}
            height={129}
            priority
            unoptimized
          />
        </div>
        <div className="max-w-[25.9rem] m-auto flex flex-col py-12 justify-between">
          <InsuranceFormContextProvider>

            {children}
          </InsuranceFormContextProvider>
        </div>{" "}
      </body>
    </html>
  );
}
