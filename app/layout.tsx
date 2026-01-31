import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PM Chat - $1 Project Management Documents",
  description: "Get 10 professional PM documents + Excel tracker for just $1. Perfect for small teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
