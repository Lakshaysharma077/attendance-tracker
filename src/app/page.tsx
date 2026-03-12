'use client';

import { useSubjects } from '@/hooks/use-subjects';
import { AppHeader } from '@/components/app-header';
import { SubjectCard } from '@/components/subject-card';
import { Button } from '@/components/ui/button';
import { AddSubjectDialog } from '@/components/add-subject-dialog';
import { useState, useEffect } from 'react';
import { BookOpen, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/firebase/auth/use-user';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, isLoading: isUserLoading } = useUser();
  const router = useRouter();
  const {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    handlePresent,
    handleAbsent,
    updateAttendanceStatus,
    isLoaded,
  } = useSubjects(user?.uid);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AddSubjectDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        onAddSubject={addSubject}
      />
      <div className="min-h-screen bg-secondary">
        <AppHeader onAddSubject={() => setIsAddDialogOpen(true)} />
        <main className="container mx-auto px-4 py-8">
          {!isLoaded ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-80 w-full" />
              <Skeleton className="h-80 w-full" />
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
                  onUpdateAttendanceStatus={updateAttendanceStatus}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-[70vh] items-center justify-center">
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                <h2 className="mt-4 text-xl font-semibold">
                  No Subjects Yet
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get started by adding your first subject.
                </p>
                <Button
                  className="mt-6"
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
