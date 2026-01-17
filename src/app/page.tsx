'use client';

import { useSubjects } from '@/hooks/use-subjects';
import { AppHeader } from '@/components/app-header';
import { SubjectCard } from '@/components/subject-card';
import { Button } from '@/components/ui/button';
import { AddSubjectDialog } from '@/components/add-subject-dialog';
import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    handlePresent,
    handleAbsent,
    isLoaded,
  } = useSubjects();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <>
      <AddSubjectDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        onAddSubject={addSubject}
      />
      <div className="min-h-screen bg-background text-foreground">
        <AppHeader onAddSubject={() => setIsAddDialogOpen(true)} />
        <main className="container mx-auto px-4 py-8">
          {!isLoaded ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-96 w-full" />
              <Skeleton className="h-96 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          ) : subjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map(subject => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onUpdate={updateSubject}
                  onDelete={deleteSubject}
                  onPresent={handlePresent}
                  onAbsent={handleAbsent}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-[70vh] items-center justify-center">
              <div className="text-center">
                <BookOpen className="mx-auto h-16 w-16 text-muted-foreground" />
                <h2 className="mt-6 font-headline text-2xl font-semibold">
                  No Subjects Yet
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Get started by adding your first subject.
                </p>
                <Button
                  className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  Add Subject
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
