'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type AppHeaderProps = {
  onAddSubject: () => void;
};

export function AppHeader({ onAddSubject }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <h1 className="font-headline text-2xl font-bold text-foreground">
            ClassTrack
          </h1>
          <Button
            onClick={onAddSubject}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Subject
          </Button>
        </div>
      </div>
    </header>
  );
}
