import Image from "next/image";
import SignInButton from "../components/SignInButton";

export default function Home() {
  return (
    <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
      <div className="lg:p-8 ">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col text-center items-center">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="site logo"
              className="-mb-6 -mt-8"
            />
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
