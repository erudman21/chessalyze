import Board from "../../components/Board";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-[50%]">
        <Board />
      </div>
      <div className="w-[50%] pr-8 py-8">{children}</div>
    </>
  );
}
