'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSubjects } from '@/hooks/use-subjects';
import { AppHeader } from '@/components/app-header';
import { SubjectCard } from '@/components/subject-card';
import { Button } from '@/components/ui/button';
import { AddSubjectDialog } from '@/components/add-subject-dialog';
import { EditSubjectDialog } from '@/components/edit-subject-dialog';
import { AttendanceReportDialog } from '@/components/attendance-report-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ArrowRight, BookOpen, CheckCircle2, LayoutDashboard, LineChart, Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/firebase';
import Link from 'next/link';
import { Subject } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [activeAction, setActiveAction] = useState<'edit' | 'delete' | 'report' | null>(null);

  // 👇 NUCLEAR GHOST FREEZE FIX: Har tarah ka body lock hatane aala jugaad
  useEffect(() => {
    // Ye hamesha run hoga taaki koi bhi accidental lock hat sake
    const removeLocks = () => {
      if (typeof document !== 'undefined') {
        document.body.style.pointerEvents = 'auto';
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
        document.documentElement.style.overflow = 'auto';
        document.body.removeAttribute('data-scroll-locked');
      }
    };

    if (!activeAction && !isAddDialogOpen) {
      removeLocks();
      const timer = setTimeout(removeLocks, 300);
      return () => clearTimeout(timer);
    }
  }, [activeAction, isAddDialogOpen]);

  // 300ms ka delay taaki dropdown animation khatam ho sake
  const openEdit = (sub: Subject) => {
    setActiveSubject(sub);
    setTimeout(() => setActiveAction('edit'), 300);
  };

  const openDelete = (sub: Subject) => {
    setActiveSubject(sub);
    setTimeout(() => setActiveAction('delete'), 300);
  };

  const openReport = (sub: Subject) => {
    setActiveSubject(sub);
    setTimeout(() => setActiveAction('report'), 300);
  };

  const clearActive = useCallback(() => {
    setActiveAction(null);
  }, []);

  const handleDeleteConfirm = () => {
    if (activeSubject) {
      deleteSubject(activeSubject.id);
      toast({
        title: 'Subject Deleted',
        description: `"${activeSubject.name}" has been removed.`,
      });
      clearActive();
    }
  };

  return (
    <>
      <AddSubjectDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        onAddSubject={addSubject}
      />

      {/* Edit Dialog */}
      {activeSubject && (
        <EditSubjectDialog
          isOpen={activeAction === 'edit'}
          setIsOpen={(open) => !open && clearActive()}
          subject={activeSubject}
          onUpdateSubject={updateSubject}
        />
      )}

      {/* Report Dialog */}
      {activeSubject && (
        <AttendanceReportDialog
          isOpen={activeAction === 'report'}
          setIsOpen={(open) => !open && clearActive()}
          subject={activeSubject}
          onUpdateAttendanceStatus={(attendanceId, oldStatus) =>
            activeSubject && updateAttendanceStatus(activeSubject.id, attendanceId, oldStatus as 'present' | 'absent')
          }
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={activeAction === 'delete'}
        onOpenChange={(open) => !open && clearActive()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the subject "{activeSubject?.name}" and all
              its attendance data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="bg-white flex flex-col">
        <AppHeader onAddSubject={() => setIsAddDialogOpen(true)} />
        <main className="container mx-auto px-6 py-8 flex-grow max-w-6xl">
          {!isLoaded ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 w-full rounded-xl" />)}
            </div>
          ) : subjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map(subject => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onEdit={() => openEdit(subject)}
                  onDelete={() => openDelete(subject)}
                  onReport={() => openReport(subject)}
                  onPresent={() => handlePresent(subject.id)}
                  onAbsent={() => handleAbsent(subject.id)}
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

import { blogPosts } from '@/lib/blog-data';

function LandingPage() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between p-6 max-w-6xl">
        <div className="text-2xl font-black tracking-tighter text-slate-900">
          ClassTrack
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/about" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">About</Link>
          <Link href="/blog" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Blog</Link>
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-8">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Trusted by 10,000+ Students
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8">
          Take Control of Your Degree. <br /> <span className="text-slate-400 font-medium">Never Miss a Goal.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          The ultimate attendance and productivity tracker built specifically for students who want to balance life, studies, and success.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="h-14 px-10 text-base font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10">
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

      {/* The Problem Section */}
      <section className="py-24 border-y border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-6">The "Attendance Math" Burnout.</h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-6">
                Most students fail not because they aren't smart, but because they lose track of the details. You start the semester strong, but by week six, you're guessing how many classes you’ve missed. 
              </p>
              <div className="space-y-4">
                {[
                  "Mental math is unreliable and stressful.",
                  "Manual tracking is tedious and easily forgotten.",
                  "Anxiety of 'Did I miss too many?' is a distraction."
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                      <div className="h-2 w-2 rounded-full bg-red-400"></div>
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm relative">
              <h3 className="text-xl font-bold mb-4">The Solution.</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                ClassTrack provides a real-time dashboard that calculates your compliance automatically.
              </p>
              <div className="space-y-6">
                <div className="h-8 w-full bg-slate-100 rounded-lg animate-pulse"></div>
                <div className="h-8 w-2/3 bg-slate-100 rounded-lg animate-pulse"></div>
                <div className="h-4 w-1/3 bg-slate-900/5 rounded-lg"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-slate-900 text-white p-4 rounded-xl font-bold text-xs shadow-2xl">
                  ClassTrack: Verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-4">Reclaim Your Time.</h2>
            <p className="text-slate-500 font-medium">Tools built to foster consistency and mental clarity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <LayoutDashboard className="h-6 w-6" />,
                title: "One-Tap Entry",
                desc: "Mark attendance in seconds. Optimized for the walk between lectures."
              },
              {
                icon: <LineChart className="h-6 w-6" />,
                title: "Missable Info",
                desc: "Know exactly how many more classes you can safely miss while staying compliant."
              },
              {
                icon: <CheckCircle2 className="h-6 w-6" />,
                title: "Sync Anywhere",
                desc: "Your data is always available on phone, tablet, and desktop via secure cloud sync."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
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

      {/* Blog Preview Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black tracking-tight mb-4">The Student Success Hub.</h2>
              <p className="text-slate-400 font-medium">Expert advice on attendance, time management, and academic systems.</p>
            </div>
            <Link href="/blog">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 rounded-xl">View All Articles</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, i) => (
              <Link href={`/blog/${post.slug}`} key={i} className="group flex flex-col h-full bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:bg-slate-800 transition-colors">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{post.category}</div>
                <h3 className="text-lg font-bold mb-4 group-hover:text-slate-300 transition-colors">{post.title}</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 flex-grow">{post.excerpt}</p>
                <div className="flex items-center text-xs font-bold gap-2 group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-800 rounded-full blur-[120px] opacity-30 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-800 rounded-full blur-[120px] opacity-30 -ml-48 -mb-48"></div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto py-24 px-6 max-w-3xl">
        <h2 className="text-3xl font-black text-center mb-16 tracking-tight text-slate-900">Common Questions</h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { q: "Is ClassTrack free to use?", a: "Yes, ClassTrack is a 100% free tool for students worldwide. We sustain the site through non-intrusive ads." },
            { q: "Can I use it for multiple subjects?", a: "Absolutely. You can add as many subjects, labs, and tutorials as you need to track." },
            { q: "Does it work on mobile?", a: "Yes, it is fully responsive and behaves like an app when saved to your home screen." },
            { q: "Where is my data stored?", a: "Your data is stored securely in Firebase Cloud, ensuring it's available across all your logged-in devices." }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black mb-2 text-slate-900 uppercase tracking-tight">{faq.q}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-100 py-12 mt-20">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">© 2026 ClassTrack. All rights reserved.</div>
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