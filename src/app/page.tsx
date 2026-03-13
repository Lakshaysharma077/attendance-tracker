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
      <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden bg-grid-slate-900/[0.03]">
        <AppHeader onAddSubject={() => setIsAddDialogOpen(true)} />
        <main className="container mx-auto px-6 py-10 flex-grow max-w-7xl">
          {!isLoaded ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-80 w-full rounded-2xl shadow-sm border border-slate-100" />
              <Skeleton className="h-80 w-full rounded-2xl shadow-sm border border-slate-100" />
              <Skeleton className="h-80 w-full rounded-2xl shadow-sm border border-slate-100" />
            </div>
          ) : subjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="flex h-[60vh] items-center justify-center">
              <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-slate-200 bg-white p-12 text-center shadow-premium max-w-md">
                <div className="h-20 w-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mb-8">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Track Your First Subject
                </h2>
                <p className="mt-4 text-slate-500 font-medium leading-relaxed">
                  Start monitoring your class attendance with precision and ease.
                </p>
                <Button
                  size="lg"
                  className="mt-8 rounded-xl h-12 px-10 font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="mr-2 h-5 w-5" />
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
      <nav className="container mx-auto flex items-center justify-between p-8 max-w-7xl">
        <div className="text-3xl font-black tracking-tighter text-slate-900">
          Class<span className="text-primary italic">Track</span>
        </div>
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/attendance-tracker" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">App</Link>
          <Link href="/about" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">About</Link>
          <Link href="/contact" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="font-bold rounded-xl h-11 px-6 text-slate-600 hover:bg-slate-50">Login</Button>
          </Link>
          <Link href="/login">
            <Button className="font-bold rounded-xl h-11 px-8 shadow-lg shadow-primary/20 hover:shadow-xl transition-all">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-32 text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-600 px-5 py-2 rounded-full border border-slate-200 mb-10">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Academic Presence Intelligence</span>
        </div>
        <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tighter text-slate-900 leading-[0.85] mb-10">
          Precision Attendance <br /> <span className="text-primary italic">for Modern Students.</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-14 font-medium leading-relaxed">
          The most professional way to monitor your academic presence. Stay compliant, stay focused, and never miss a mandatory lecture again.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/login">
            <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95">
              Start Tracking Free
            </Button>
          </Link>
          <Link href="/bunk-calculator">
            <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95">
              Bunk Calculator
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-32 border-y border-slate-200/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
              Built for Surgical <br /> Accuracy.
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">Everything you need to manage your university life with complete confidence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: <LayoutDashboard className="h-6 w-6" />, 
                title: "Executive Dashboard", 
                desc: "High-fidelity visualization of your attendance across all subjects." 
              },
              { 
                icon: <LineChart className="h-6 w-6" />, 
                title: "Compliance Math", 
                desc: "Calculates exactly how many sessions you must attend to stay safe." 
              },
              { 
                icon: <CheckCircle2 className="h-6 w-6" />, 
                title: "Cloud Sync", 
                desc: "Your data is always available, secure, and synced across all your devices." 
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-premium transition-all group">
                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO/Content Section */}
      <section className="container mx-auto py-32 px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">Professional Guidance for <br /> Every Student.</h2>
            <div className="space-y-8">
              <div className="p-1 border-l-4 border-primary pl-8">
                <h3 className="text-xl font-bold mb-2 text-slate-900">Why Track Attendance?</h3>
                <p className="text-slate-500 font-medium leading-relaxed">University regulations are stricter than ever. A dedicated <strong>student attendance tracker</strong> ensures you never fall below the mandatory 75% or 85% requirement.</p>
              </div>
              <div className="p-1 border-l-4 border-slate-200 pl-8">
                <h3 className="text-xl font-bold mb-2 text-slate-900">How It Works</h3>
                <p className="text-slate-500 font-medium leading-relaxed italic">Attendance % = (Attended / Total) × 100</p>
                <p className="mt-4 text-slate-500 font-medium leading-relaxed">Our system automates the math, giving you immediate insights into your eligibility for final examinations.</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/30 transition-all" />
            <h3 className="text-3xl font-bold mb-6 tracking-tight">Enterprise-Grade Security</h3>
            <p className="text-slate-400 font-medium leading-relaxed text-lg mb-10">
              We leverage Google's Firebase infrastructure to provide you with secure, encrypted storage for your academic data. Your privacy is our priority.
            </p>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Infrastructure</p>
                <p className="font-bold">Google Firebase Verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto pb-32 px-6 max-w-4xl">
        <h2 className="text-4xl font-black text-center mb-16 tracking-tight text-slate-900">Common Questions</h2>
        <div className="space-y-6">
          {[
            { q: "Is ClassTrack free to use?", a: "Yes, ClassTrack is a 100% free tool for students worldwide. We sustain our operations through high-quality, non-intrusive advertisements." },
            { q: "Can I use it for multiple subjects?", a: "Absolutely. You can add as many subjects as you need and manage them individually through your dashboard." },
            { q: "Does it work on mobile?", a: "ClassTrack is built with a mobile-first philosophy, ensuring a flawless experience on smartphones, tablets, and desktops." }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:border-slate-200 transition-colors">
              <h3 className="text-xl font-bold mb-3 text-slate-900">{faq.q}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

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
