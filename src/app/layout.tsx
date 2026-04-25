import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AiChatWidget } from "@/components/ai-chat-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aagam Sheth | Interactive Portfolio",
  description: "Highly interactive 3D developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-neutral-950 text-neutral-50`}>
        {children}
        <AiChatWidget />
      </body>
    </html>
  );
}
