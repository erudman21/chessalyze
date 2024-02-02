import Link from "next/link";
import LogoImage from "./LogoImage";
import UserNav from "./UserNav";

export default function NavBar() {
  return (
    <nav className="md:py-4">
      <div className="px-4 md:max-w-[1800px] mx-auto">
        <div className="flex justify-between items-center py-3">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-end gap-2">
              <LogoImage size={30} />
              <h1 className="text-3xl font-medium tracking-tight">
                Chessalyze
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
}
