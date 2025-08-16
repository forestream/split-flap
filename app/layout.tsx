import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Split Flap",
  description: "Split Flap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex h-[100vh] flex-col items-center justify-center gap-8">
        {children}
      </body>
    </html>
  );
}
