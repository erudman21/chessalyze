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
        <AccordionItem value="item-3">
          <AccordionTrigger className="AccordionTrigger">
            Click to reveal the game
          </AccordionTrigger>
          <AccordionContent className="bg-black">STUFF</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
