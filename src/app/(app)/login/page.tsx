import LogoImage from "../../../components/LogoImage";
import SignInButton from "../../../components/SignInButton";

export default function Page() {
  return (
    <div className="flex h-full md:flex-grow relative flex-col items-center justify-center md:grid">
      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col text-center items-center">
            <LogoImage />
            <div className="flex flex-col gap-y-0.5">
              <h1 className="text-3xl font-medium tracking-tight">
                Chessalyze
              </h1>
              <p className="text-sm text-muted-foreground">
                Test your chess positional evaluation skills
              </p>
            </div>
            <SignInButton className="w-full mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
