'use client';

import { useSubjects } from '@/hooks/use-subjects';
import { AppHeader } from '@/components/app-header';
import { SubjectCard } from '@/components/subject-card';
import { Button } from '@/components/ui/button';
import { AddSubjectDialog } from '@/components/add-subject-dialog';
import { useState } from 'react';
import { BookOpen, CheckCircle2, LayoutDashboard, LineChart, ShieldCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/firebase';
import Link from 'next/link';

function Dashboard({ user }: { user: any }) {
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

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between p-6">
        <div className="text-2xl font-bold tracking-tighter text-primary">ClassTrack</div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto mt-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
          Attendance Tracker <span className="text-primary">for Students</span>
        </h1>
        <h2 className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground md:text-2xl">
          Track Your Class Attendance Easily. Class Track is a simple attendance tracker that 
          helps students monitor their class attendance percentage and manage subjects easily.
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/login">
            <Button size="lg" className="px-8 py-6 text-lg">Start Tracking Now</Button>
          </Link>
          <Link href="/attendance-tracker">
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">Learn More</Button>
          </Link>
        </div>
      </header>

      {/* Feature Section */}
      <section className="container mx-auto mt-32 px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LayoutDashboard size={32} />
            </div>
            <h3 className="text-xl font-bold">Subject Management</h3>
            <p className="mt-2 text-muted-foreground">
              Add all your subjects and manage them in one place with a beautiful, 
              modern dashboard designed for students.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LineChart size={32} />
            </div>
            <h3 className="text-xl font-bold">Smart Insights</h3>
            <p className="mt-2 text-muted-foreground">
              Know exactly how many classes you can miss or need to attend to 
              reach your attendance requirement.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold">Privacy First</h3>
            <p className="mt-2 text-muted-foreground">
              Your data is secure with Firebase authentication. Use it as a personal 
              student attendance tracker.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="mt-32 bg-secondary py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Why use an online attendance tracker for students?
            </h2>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground">
              <p>
                Managing college attendance can be stressful. With Class Track, you no longer need 
                to maintain manual logs or simple spreadsheets. Our platform acts as a dedicated 
                <strong> student attendance tracker</strong> that calculates your percentages in real-time.
              </p>
              <p>
                Whether you're looking for an <strong>attendance percentage calculator</strong> or 
                a way to <strong>track class attendance online</strong>, Class Track provides 
                the smartest solution. It's built for students who want to stay on top of their 
                academic requirements without the hassle.
              </p>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Free and easy to use</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Mobile-friendly UI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Works for any subject</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Real-time calculation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="container mx-auto border-t py-12 text-center text-muted-foreground">
        <div className="text-lg font-bold text-foreground">ClassTrack</div>
        <p className="mt-2">&copy; {new Date().getFullYear()} Smart Attendance Tracking for Students.</p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="/attendance-tracker" className="hover:text-primary">Attendance Tracker</Link>
          <Link href="/class-attendance-calculator" className="hover:text-primary">Calculator</Link>
          <Link href="/student-attendance-tracker" className="hover:text-primary">Student Tracker</Link>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  const { user, isLoading: isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    );
  }

  if (user) {
    return <Dashboard user={user} />;
  }

  return <LandingPage />;
}
