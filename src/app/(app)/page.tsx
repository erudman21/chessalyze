import EvaluateForm from "../../components/EvaluateForm";

export default function Page() {
  return (
    <div className="flex h-full md:flex-grow relative flex-col items-center justify-center md:grid">
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Evaluate a position
            </h1>
            <p className="text-sm text-muted-foreground">
              Either enter a Chess.com username below or get a random game from
              a high-rated tournament
            </p>
          </div>
          <EvaluateForm />
        </div>
      </div>
    </div>
  );
}
