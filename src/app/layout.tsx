import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AiChatWidget } from "@/components/ai-chat-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aagam Sheth | Interactive Portfolio",
  description: "Highly interactive 3D developer portfolio",
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased selection:bg-blue-500/30`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <AiChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
