'use client';

import { useSubjects } from '@/hooks/use-subjects';
import { AppHeader } from '@/components/app-header';
import { SubjectCard } from '@/components/subject-card';
import { Button } from '@/components/ui/button';
import { AddSubjectDialog } from '@/components/add-subject-dialog';
import { useState } from 'react';
import { BookOpen, CheckCircle2, LayoutDashboard, LineChart, ShieldCheck, Plus } from 'lucide-react';
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
      <div className="min-h-screen bg-white flex flex-col">
        <AppHeader onAddSubject={() => setIsAddDialogOpen(true)} />
        <main className="container mx-auto px-6 py-8 flex-grow max-w-6xl">
          {!isLoaded ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-64 w-full rounded-xl" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          ) : subjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map(subject => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onUpdate={updateSubject}
                  onDelete={deleteSubject}
                  onPresent={() => handlePresent(subject.id)}
                  onAbsent={() => handleAbsent(subject.id)}
                  onStatusUpdate={(attendanceId, oldStatus) => updateAttendanceStatus(subject.id, attendanceId, oldStatus as 'present' | 'absent')}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-[50vh] items-center justify-center">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center max-w-md">
                <div className="h-16 w-16 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                  <BookOpen className="h-8 w-8 text-slate-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  Track Your First Subject
                </h2>
                <p className="mt-2 text-slate-500 text-sm">
                  Start monitoring your class attendance with precision and ease.
                </p>
                <Button
                  className="mt-8 rounded-lg h-11 px-8 font-bold bg-slate-900 hover:bg-slate-800 text-white"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Subject
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between p-6 max-w-6xl">
        <div className="text-2xl font-black tracking-tighter text-slate-900">
          ClassTrack
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/about" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">About</Link>
          <Link href="/contact" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" className="font-bold rounded-lg h-10 px-5 text-slate-600 text-xs">Login</Button>
          </Link>
          <Link href="/login">
            <Button className="font-bold rounded-lg h-10 px-6 bg-slate-900 hover:bg-slate-800 text-white text-xs">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-24 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8">
          Simple Attendance <br /> <span className="text-slate-500">for Modern Students.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto mb-12 font-medium">
          The cleanest way to monitor your academic presence. Stay compliant, stay focused.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="h-14 px-10 text-base font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white">
              Start Tracking Free
            </Button>
          </Link>
          <Link href="/bunk-calculator">
            <Button variant="outline" size="lg" className="h-14 px-10 text-base font-bold rounded-xl border-slate-200">
              Bunk Calculator
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <LayoutDashboard className="h-6 w-6" />, 
                title: "Dashboard", 
                desc: "Clear visualization of your attendance across all subjects." 
              },
              { 
                icon: <LineChart className="h-6 w-6" />, 
                title: "Compliance Math", 
                desc: "Calculates exactly how many sessions you must attend." 
              },
              { 
                icon: <CheckCircle2 className="h-6 w-6" />, 
                title: "Cloud Sync", 
                desc: "Your data is always available and synced across all your devices." 
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm">
                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto py-24 px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12 tracking-tight text-slate-900">Common Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Is ClassTrack free to use?", a: "Yes, ClassTrack is a 100% free tool for students worldwide." },
            { q: "Can I use it for multiple subjects?", a: "Absolutely. You can add as many subjects as you need." },
            { q: "Does it work on mobile?", a: "Yes, it works flawlessly on all devices." }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-8 rounded-xl border border-slate-100">
              <h3 className="text-base font-bold mb-2 text-slate-900">{faq.q}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
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
