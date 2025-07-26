import "./globals.css";
import type { Metadata } from "next";

// Optional: You can define global metadata here
export const metadata: Metadata = {
  title: "Hamna Tameez Portfolio",
  description: "Scroll-activated single page portfolio site by Hamna Tameez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}