import { Button } from "./shadcn/ui/button";

export default function EvaluateNavBar() {
  return (
    <div className="flex py-4">
      <Button className="mr-auto">Reveal Game</Button>
      <Button className="">Evaluate new game</Button>
    </div>
  );
}
