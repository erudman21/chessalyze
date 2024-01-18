import Board from "../../../components/Board";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-grow">
      <div className="w-1/2 pt-[4.25rem]">
        <Board />
      </div>
      <div className="w-1/2 pr-8 py-8">{children}</div>
    </div>
  );
}
