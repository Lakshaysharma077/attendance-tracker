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
      <div className="min-h-screen bg-slate-100 flex flex-col relative overflow-hidden">
        {/* Floating 3D Background Elements for Dashboard */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px] animate-float-3d" />
          <div className="absolute bottom-[0%] left-[-10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px] animate-float-3d" style={{ animationDelay: '-3s' }} />
        </div>

        <AppHeader onAddSubject={() => setIsAddDialogOpen(true)} />
        <main className="container mx-auto px-4 py-8 flex-grow perspective-1000">
          {!isLoaded ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-80 w-full rounded-[2rem] shadow-3d animate-pulse" />
              <Skeleton className="h-80 w-full rounded-[2rem] shadow-3d animate-pulse" />
              <Skeleton className="h-80 w-full rounded-[2rem] shadow-3d animate-pulse" />
            </div>
          ) : subjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 preserve-3d">
              {subjects.map(subject => (
                <div key={subject.id} className="card-3d">
                  <SubjectCard
                    subject={subject}
                    onUpdate={updateSubject}
                    onDelete={deleteSubject}
                    onPresent={() => handlePresent(subject.id)}
                    onAbsent={() => handleAbsent(subject.id)}
                    onStatusUpdate={(status) => updateAttendanceStatus(subject.id, status)}
                  />
                </div>
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
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">ClassTrack</Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/attendance-tracker" className="text-sm font-medium hover:text-primary transition-colors">App</Link>
          <Link href="/class-attendance-calculator" className="text-sm font-medium hover:text-primary transition-colors">Calculator</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Floating 3D Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-float-3d" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-[150px] animate-float-3d" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-secondary rounded-full blur-[100px] animate-float-3d" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Hero Section */}
      <header className="container mx-auto mt-20 px-6 text-center perspective-1000">
        <div className="preserve-3d transition-transform duration-1000">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl mb-6 shadow-3d-primary py-2 px-4 rounded-3xl inline-block bg-background/50 backdrop-blur-sm border border-border/50 translate-z-10">
            Attendance Tracker <span className="text-primary italic">for Students</span>
          </h1>
          <div className="mx-auto mt-6 max-w-3xl glass-3d p-8 rounded-[2.5rem] card-3d">
            <p className="text-xl text-muted-foreground md:text-2xl leading-relaxed">
              Class Track is a free, simple attendance tracker that helps students monitor their 
              class attendance percentage and manage subjects easily. Stay ahead of your attendance 
              goals and never worry about debarment again.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row preserve-3d">
          <Link href="/login">
            <Button size="lg" className="px-10 py-7 text-xl rounded-2xl shadow-3d-primary hover:scale-105 transition-all duration-300 active:scale-95">
              Start Tracking Now
            </Button>
          </Link>
          <Link href="/attendance-tracker">
            <Button size="lg" variant="outline" className="px-10 py-7 text-xl rounded-2xl glass-3d hover:bg-secondary/50 transition-all duration-300">
              Learn More
            </Button>
          </Link>
        </div>
      </header>

      {/* How it Works Section - PROMOTES TEXT CONTENT */}
      <section className="container mx-auto mt-32 px-6 perspective-1000">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 tracking-tight">How our <span className="text-primary italic">3D Tracker</span> Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Designed for simplicity and speed. Get started in less than a minute.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-10 rounded-[2.5rem] bg-secondary/30 border border-border/50 card-3d shadow-3d group">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-8 shadow-3d-primary group-hover:scale-110 transition-transform">1</div>
            <h3 className="text-2xl font-bold mb-4">Add Your Subjects</h3>
            <p className="text-muted-foreground text-lg">Input the names of all your current classes. You can even set target attendance goals.</p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-secondary/30 border border-border/50 card-3d shadow-3d group" style={{ transitionDelay: '100ms' }}>
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-8 shadow-3d-primary group-hover:scale-110 transition-transform">2</div>
            <h3 className="text-2xl font-bold mb-4">Mark Attendance</h3>
            <p className="text-muted-foreground text-lg">With just one tap, update whether you were present or absent after every lecture.</p>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-secondary/30 border border-border/50 card-3d shadow-3d group" style={{ transitionDelay: '200ms' }}>
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-8 shadow-3d-primary group-hover:scale-110 transition-transform">3</div>
            <h3 className="text-2xl font-bold mb-4">Stay Eligible</h3>
            <p className="text-muted-foreground text-lg">Our smart bunk calculator tells you exactly how many more classes you can safely miss.</p>
          </div>
        </div>
      </section>

      {/* Feature Section with Perspective */}
      <section className="container mx-auto mt-40 px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-8 glass-3d rounded-3xl card-3d">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/10 text-primary animate-float-3d shadow-3d">
              <LayoutDashboard size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Subject Management</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Add all your subjects and manage them in one place with a beautiful, 
              modern dashboard designed for university students.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 glass-3d rounded-3xl card-3d" style={{ animationDelay: '-1s' }}>
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/10 text-primary animate-float-3d shadow-3d">
              <LineChart size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Smart Insights</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Know exactly how many classes you can miss or need to attend to 
              reach your 75% or 85% attendance requirement.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 glass-3d rounded-3xl card-3d" style={{ animationDelay: '-2s' }}>
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary/10 text-primary animate-float-3d shadow-3d">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Privacy First</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your data is secure with Firebase authentication. Use it as a private 
              <strong> student attendance tracker</strong> that only you can see.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content Section - HEAVY TEXT FOR ADSENSE with 3D Depth */}
      <section className="mt-40 bg-secondary/30 py-32 border-y relative perspective-1000">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto glass-3d p-12 md:p-20 rounded-[3rem] shadow-3d card-3d">
            <h2 className="text-4xl font-extrabold leading-tight md:text-5xl mb-10 tracking-tight">
              Why use an <span className="text-primary italic underline decoration-primary/20">online</span> attendance tracker?
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Managing academic performance and college attendance at the same time can be incredibly stressful.
                With tight schedules and strict university regulations, missing even one extra class can 
                result in being debarred from final exams. With Class Track, you no longer need 
                to maintain manual logs or messy paper spreadsheets. 
              </p>
              <p>
                Our platform acts as a dedicated <strong>student attendance tracker</strong> that calculates 
                your percentages in real-time. Whether you are using a <strong>bunk calculator</strong> 
                to plan your next holiday or a <strong>75 percent attendance calculator</strong> to recover 
                from an illness, Class Track provides the smartest solution accessible from any device.
              </p>
              <h3 className="text-2xl font-bold text-foreground pt-4">Benefits of Class Track:</h3>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Free and easy to use globally</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Cloud-synced for mobile access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Works for any subject or course</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Instantly calculate attendance %</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - CRITICAL FOR SEO */}
      <section className="container mx-auto mt-32 px-6 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-8">
          <div className="bg-card p-8 rounded-2xl border">
            <h3 className="text-xl font-bold mb-3">How do I calculate attendance percentage?</h3>
            <p className="text-muted-foreground italic">Attendance % = (Classes Attended / Total Classes Conducted) × 100.</p>
            <p className="mt-2 text-muted-foreground">Class Track does this automatically for every subject you add.</p>
          </div>
          <div className="bg-card p-8 rounded-2xl border">
            <h3 className="text-xl font-bold mb-3">Is this student attendance tracker free?</h3>
            <p className="text-muted-foreground">Yes! ClassTrack is 100% free for all students. We are funded by high-quality non-intrusive ads from partners like Google AdSense to keep the service running.</p>
          </div>
          <div className="bg-card p-8 rounded-2xl border">
            <h3 className="text-xl font-bold mb-3">Will my data be secure?</h3>
            <p className="text-muted-foreground">Absolutely. We use Firebase's industry-standard authentication and database to ensure that only you can access your attendance data.</p>
          </div>
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
