import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Board from "../components/ui/Board";
import BoardProvider from "./board-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chessalyze",
  description: "Test your evaluation skills",
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
        className={`${inter.className} bg-background dark text-zinc-100 flex items-stretch`}
      >
        <BoardProvider>
          <div className="w-[50%]">
            <Board />
          </div>
          <div className="w-[50%] pr-8 py-8">{children}</div>
        </BoardProvider>
      </body>
    </html>
  );
}
