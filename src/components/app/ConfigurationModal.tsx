'use client';

import { useState } from 'react';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Settings } from 'lucide-react';

interface ConfigurationModalProps {
  defaultRounds?: number;
  onConfirm: (rounds: number) => void;
  triggerButtonText: string;
  triggerButtonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  triggerButtonClassName?: string;
}

const ConfigurationModal = ({
  defaultRounds = 3,
  onConfirm,
  triggerButtonText,
  triggerButtonVariant = "default",
  triggerButtonClassName
}: ConfigurationModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rounds, setRounds] = useState(defaultRounds);
  const { translate } = useLocalization();

  const handleConfirm = () => {
    onConfirm(rounds);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerButtonVariant} className={triggerButtonClassName}>
          <Settings className="mr-2 h-4 w-4" />
          {triggerButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translate('configureSession')}</DialogTitle>
          <DialogDescription>
            {translate('numberOfRounds')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rounds" className="text-right col-span-2">
              {translate('numberOfRounds').replace('(1-10):','')} {/* Remove range for brevity */}
            </Label>
            <Input
              id="rounds"
              type="number"
              value={rounds}
              onChange={(e) => setRounds(Math.max(1, Math.min(10, parseInt(e.target.value, 10) || 1)))}
              min="1"
              max="10"
              className="col-span-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleConfirm} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {translate('beginSession')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigurationModal;
