import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Faq({data=[]}) {
  return (
    <div className="px-64 my-48">
      <p className="text-3xl font-bold text-center mb-16">Frequently Asked Question</p>
      <Accordion type="single" collapsible>
        {data.map((item, index)=><AccordionItem key={index} value={`item-${index+1}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            {item.answer}
          </AccordionContent>
        </AccordionItem>)}
      </Accordion>
    </div>
  );
}

export default Faq;
