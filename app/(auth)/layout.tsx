import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "DevConnect",
  description: "A social media platform to connect developers with eachother ",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
            <Analytics />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
