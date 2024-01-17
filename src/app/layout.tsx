import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthSessionProvider from "../components/AuthSessionProvider";
import BoardProvider from "../components/BoardProvider";
import Board from "../components/Board";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chessalyze",
  description: "Test your evaluation skills",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-hidden">
      <head></head>
      <body
        className={`${inter.className} bg-background dark text-foreground flex items-stretch`}
      >
        <AuthSessionProvider>
          <BoardProvider>
            <div className="w-[50%]">
              <Board />
            </div>
            <div className="w-[50%]">{children}</div>
          </BoardProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
