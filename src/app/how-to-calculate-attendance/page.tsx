'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, GraduationCap, Laptop, ChevronRight, PenTool, CheckCircle2 } from 'lucide-react';

export default function HowToCalculatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground/90 font-sans">
      <nav className="container mx-auto flex items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <header className="mb-20">
          <h1 className="text-4xl font-extrabold mb-6 md:text-7xl tracking-tighter">
            How to <span className="text-primary underline decoration-primary/20">Calculate</span> Attendance
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed">
            A comprehensive guide for students on maintaining, calculating, and managing class attendance records effectively.
          </p>
        </header>
        
        <article className="space-y-20">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">The Basic Formula</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Calculating your attendance isn't just about counting days; it's about ratios. To find your percentage, you need two numbers:
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-2xl bg-card">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">1</div>
                  <span><strong>Numerator:</strong> Classes you attended.</span>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-2xl bg-card">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">2</div>
                  <span><strong>Denominator:</strong> Total classes held.</span>
                </div>
              </div>
            </div>
            <div className="bg-secondary rounded-[2.5rem] p-12 text-center border-4 border-white shadow-xl">
               <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold mb-4">Formula</p>
               <div className="text-4xl font-black text-primary mb-2">(A / T) * 100</div>
               <p className="text-muted-foreground">Instant Percentage</p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">Step-by-Step Guide for Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-3xl border">
                <GraduationCap className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Check the Criteria</h3>
                <p className="text-muted-foreground">Find out your college's minimum requirement (usually 75%).</p>
              </div>
              <div className="bg-card p-8 rounded-3xl border">
                <Laptop className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Track Conducted Classes</h3>
                <p className="text-muted-foreground">Note down every time a teacher takes attendance, even if you are absent.</p>
              </div>
              <div className="bg-card p-8 rounded-3xl border">
                <BookOpen className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Deduct Holidays</h3>
                <p className="text-muted-foreground">Official holidays don't usually count as "classes held."</p>
              </div>
              <div className="bg-card p-8 rounded-3xl border">
                <PenTool className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Use an App</h3>
                <p className="text-muted-foreground">Manual logging is unreliable. Use a tool like <strong>ClassTrack</strong> for 100% accuracy.</p>
              </div>
            </div>
          </section>

          <section className="bg-slate-950 text-white rounded-[3rem] p-12 overflow-hidden relative">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mb-48 -mr-48"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Why automate your attendance tracking?</h2>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl">
                Manual calculations lead to anxiety. "Did I miss a class last Tuesday?" or "Does lab count as two classes?" 
                With ClassTrack, you just mark 'P' or 'A' and the app calculates everything for you.
              </p>
              <ul className="mb-10 space-y-4">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" /> Cloud storage for your logs</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" /> Visual graphs of your progress</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" /> Bunk-safe indicators</li>
              </ul>
              <Link href="/login">
                <Button size="lg" className="rounded-full px-10 h-14 text-lg">
                  Start Tracking for Free <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <footer className="border-t py-12 text-center text-muted-foreground mt-20">
        <p>&copy; {new Date().getFullYear()} ClassTrack - Educational Guides for Students.</p>
      </footer>
    </div>
  );
}
