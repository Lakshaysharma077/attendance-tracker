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

      {/* Hero Section */}
      <header className="container mx-auto mt-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
          Attendance Tracker <span className="text-primary">for Students</span>
        </h1>
        <div className="mx-auto mt-6 max-w-3xl">
          <p className="text-xl text-muted-foreground md:text-2xl leading-relaxed">
            Class Track is a free, simple attendance tracker that helps students monitor their 
            class attendance percentage and manage subjects easily. Stay ahead of your attendance 
            goals and never worry about debarment again.
          </p>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/login">
            <Button size="lg" className="px-8 py-6 text-lg">Start Tracking Now</Button>
          </Link>
          <Link href="/attendance-tracker">
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">Learn More</Button>
          </Link>
        </div>
      </header>

      {/* How it Works Section - PROMOTES TEXT CONTENT */}
      <section className="container mx-auto mt-32 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold md:text-4xl mb-4">How our Attendance Tracker Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Designed for simplicity and speed. Get started in less than a minute.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-3xl bg-secondary/50 border border-border/50">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">1</div>
            <h3 className="text-xl font-bold mb-3">Add Your Subjects</h3>
            <p className="text-muted-foreground">Input the names of all your current classes. You can even set target attendance goals.</p>
          </div>
          <div className="p-8 rounded-3xl bg-secondary/50 border border-border/50">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">2</div>
            <h3 className="text-xl font-bold mb-3">Mark Attendance</h3>
            <p className="text-muted-foreground">With just one tap, update whether you were present or absent after every lecture.</p>
          </div>
          <div className="p-8 rounded-3xl bg-secondary/50 border border-border/50">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">3</div>
            <h3 className="text-xl font-bold mb-3">Stay eligible</h3>
            <p className="text-muted-foreground">Our smart bunk calculator tells you exactly how many more classes you can safely miss.</p>
          </div>
        </div>
      </section>

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
              modern dashboard designed for university students.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LineChart size={32} />
            </div>
            <h3 className="text-xl font-bold">Smart Insights</h3>
            <p className="mt-2 text-muted-foreground">
              Know exactly how many classes you can miss or need to attend to 
              reach your 75% or 85% attendance requirement.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold">Privacy First</h3>
            <p className="mt-2 text-muted-foreground">
              Your data is secure with Firebase authentication. Use it as a private 
              <strong> student attendance tracker</strong> that only you can see.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content Section - HEAVY TEXT FOR ADSENSE */}
      <section className="mt-32 bg-secondary/30 py-24 border-y">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl mb-8">
              Why use an online attendance tracker for students?
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

      {/* CTA Footer */}
      <footer className="container mx-auto mt-32 border-t py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="text-2xl font-bold text-foreground">ClassTrack</div>
            <p className="mt-4 text-muted-foreground">Smart attendance tracking and calculations for modern college students.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-wider text-sm">Tools</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/attendance-tracker" className="hover:text-primary transition-colors">Attendance Tracker</Link></li>
              <li><Link href="/class-attendance-calculator" className="hover:text-primary transition-colors">Calculator</Link></li>
              <li><Link href="/bunk-calculator" className="hover:text-primary transition-colors">Bunk Calculator</Link></li>
              <li><Link href="/attendance-percentage-calculator" className="hover:text-primary transition-colors">Percentage Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-wider text-sm">Legal & Help</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-muted-foreground pt-8 border-t">
          <p>&copy; {new Date().getFullYear()} ClassTrack. All Rights Reserved.</p>
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
