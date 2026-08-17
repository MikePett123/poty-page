import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Player of the Year Voting",
  description: "Cast your vote for Player of the Year",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-white antialiased">{children}</body>
    </html>
  );
}
