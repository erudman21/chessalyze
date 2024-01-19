import ChessCOMGameInfo from "./ChessCOMGameInfo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/shadcn/ui/accordion";

export default function EvaluateNavBar() {
  return (
    <div className="absolute w-full">
      <Accordion collapsible type="single">
        <AccordionItem value="item-3" className="relative z-[999]">
          <AccordionTrigger className="AccordionTrigger pt-0">
            Click to reveal the game
          </AccordionTrigger>
          <AccordionContent className="bg-background">
            <ChessCOMGameInfo />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
