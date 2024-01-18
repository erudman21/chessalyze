import Board from "../../../components/Board";
import NavBar from "../../../components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="flex flex-grow">
        <div className="w-1/2">
          <Board />
        </div>
        <div className="w-1/2 pr-8 py-8">{children}</div>
      </div>
    </>
  );
}
