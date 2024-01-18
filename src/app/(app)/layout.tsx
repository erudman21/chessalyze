import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthSessionProvider from "../../components/AuthSessionProvider";
import BoardProvider from "../../components/BoardProvider";
import Board from "../../components/Board";
import NavBar from "../../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chessalyze",
  description: "Test your evaluation skills",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${inter.className} bg-background dark text-foreground flex items-stretch h-screen flex-col overflow-y-hidden`}
      >
        <AuthSessionProvider>
          <BoardProvider>{children}</BoardProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
