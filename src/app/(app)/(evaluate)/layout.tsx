import Board from "../../../components/Board";
import NavBar from "../../../components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="flex flex-grow">
        <div className="w-1/2 hidden md:block md:min-w-[600px]">
          <Board />
        </div>
        <div className="flex flex-grow pb-20">{children}</div>
      </div>
    </>
  );
}
