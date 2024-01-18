import Link from "next/link";
import LogoImage from "./LogoImage";
import UserNav from "./UserNav";

export default function NavBar() {
  return (
    <div className="w-full py-6 px-16 flex justify-between items-center">
      <Link href="/" className="flex items-end gap-2">
        <LogoImage size={30} />
        <h1 className="text-3xl font-medium tracking-tight">Chessalyze</h1>
      </Link>
      <UserNav />
    </div>
  );
}
