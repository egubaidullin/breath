'use client';

import { useState } from 'react';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Info } from 'lucide-react';

const WimHofMethodInfo = () => {
  const { translate } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  // Split the description into paragraphs for better rendering
  // This logic is preserved from the original Accordion version
  const descriptionParagraphs = translate('wimHofMethodDescription').split('\n\n');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto flex items-center justify-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          <span>{translate('wimHofMethodTitle')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
             <Info className="h-6 w-6 text-primary" />
             {translate('wimHofMethodTitle')}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-base text-muted-foreground">
          {descriptionParagraphs.map((paragraph, index) => {
            const trimmedParagraph = paragraph.trimStart();
            if (trimmedParagraph.startsWith('**') && trimmedParagraph.endsWith('**')) {
              return <p key={index} className="font-semibold text-foreground">{trimmedParagraph.slice(2, -2)}</p>;
            }
            // Basic list item styling for items starting with "number."
            if (/^\d+\.\s/.test(trimmedParagraph)) {
              return <p key={index} className="ml-4">{trimmedParagraph}</p>;
            }
            return <p key={index}>{trimmedParagraph}</p>;
          })}
        </div>
        <DialogFooter className="p-6 pt-4 border-t">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {translate('closeButtonLabel')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WimHofMethodInfo;
