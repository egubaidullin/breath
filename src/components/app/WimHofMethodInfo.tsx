'use client';

import { useLocalization } from '@/contexts/LocalizationContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Info } from 'lucide-react';

const WimHofMethodInfo = () => {
  const { translate } = useLocalization();

  // Split the description into paragraphs for better rendering
  const descriptionParagraphs = translate('wimHofMethodDescription').split('\n\n');

  return (
    <Accordion type="single" collapsible className="w-full mb-8">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
          <div className="flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            <span>{translate('wimHofMethodTitle')}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-base text-muted-foreground space-y-4 pt-4">
          {descriptionParagraphs.map((paragraph, index) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return <p key={index} className="font-semibold text-foreground">{paragraph.slice(2, -2)}</p>;
            }
            if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.')) {
              // Simple list item handling
              return <p key={index} className="ml-4">{paragraph}</p>;
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default WimHofMethodInfo;
