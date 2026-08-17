import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Player of the Year Voting",
  description: "Cast your vote for Player of the Year",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans text-white antialiased">
        <div className="bg-photo-collage" aria-hidden="true">
          <div className="bg-photo" style={{ backgroundImage: "url(/bg/team-sunset.jpg)" }} />
          <div className="bg-photo" style={{ backgroundImage: "url(/bg/team-huddle.jpg)" }} />
          <div className="bg-photo" style={{ backgroundImage: "url(/bg/selfie-two.jpg)" }} />
          <div className="bg-photo" style={{ backgroundImage: "url(/bg/player-standing.jpg)" }} />
          <div className="bg-photo" style={{ backgroundImage: "url(/bg/comic1.jpg)" }} />
          <div className="bg-photo" style={{ backgroundImage: "url(/bg/comic2.jpg)" }} />
        </div>
        <div className="bg-photo-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
