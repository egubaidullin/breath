'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { useLocalization } from '@/contexts/LocalizationContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User } from 'lucide-react';

interface UserNameFormProps {
  onNameSaved: (name: string) => void;
}

const UserNameForm = ({ onNameSaved }: UserNameFormProps) => {
  const [name, setName] = useState('');
  const { translate } = useLocalization();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSaved(name.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <User className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">{translate('appName')}</CardTitle>
          <CardDescription>{translate('enterYourName')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={translate('namePlaceholder')}
                required
                className="text-base"
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {translate('saveName')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserNameForm;
