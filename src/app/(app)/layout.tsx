import { getServerSession } from "next-auth";
import Board from "../../components/Board";
import NavBar from "../../components/NavBar";
import { cn } from "../../lib/utils";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <>
      {session?.user && <NavBar />}
      <div
        className={cn(
          "flex w-full h-full justify-center",
          session?.user && "pb-20"
        )}
      >
        <div className="hidden md:flex items-center w-[max(50%,800px)]">
          <div className="w-[min(90vh,800px)] px-8 ml-auto">
            <Board />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
