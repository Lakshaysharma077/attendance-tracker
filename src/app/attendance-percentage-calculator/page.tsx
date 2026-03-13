'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calculator, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AttendancePercentageCalculatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground/90">
      <nav className="container mx-auto flex items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-8 md:text-6xl text-center">
          Attendance <span className="text-primary">Percentage Calculator</span>
        </h1>
        
        <div className="bg-secondary/50 rounded-3xl p-8 mb-12 border border-border/50 text-center">
          <p className="text-xl mb-6">Calculate your class attendance percentage instantly and accurately.</p>
          <Link href="/login">
            <Button size="lg" className="h-14 px-10 text-lg">Use Free Calculator Now</Button>
          </Link>
        </div>

        <article className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">How to Calculate Attendance Percentage?</h2>
            <p className="text-lg leading-relaxed">
              Calculating your attendance percentage is a simple mathematical process, but doing it manually every day can be tedious. 
              Whether you are a college student or a high schooler, knowing your exact percentage is crucial to meet university requirements 
              and avoid being debarred from exams.
            </p>
            <div className="bg-card p-6 rounded-2xl border my-6 text-center">
              <span className="text-2xl font-mono font-bold text-primary">Percentage = (Attended / Total) × 100</span>
            </div>
            <p className="text-lg leading-relaxed">
              For example, if you have attended 45 classes out of a total of 60 classes conducted, your calculation would be:
              <br/><strong>(45 / 60) × 100 = 75%</strong>
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Why use an Online Attendance Calculator?</h2>
            <p className="text-lg leading-relaxed">
              While the formula is simple, an online <strong>attendance percentage calculator</strong> like ClassTrack offers several advantages:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <li className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl">
                <CheckCircle2 className="text-primary h-6 w-6" />
                <span>Error-free calculations every time</span>
              </li>
              <li className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl">
                <CheckCircle2 className="text-primary h-6 w-6" />
                <span>Track multiple subjects in one place</span>
              </li>
              <li className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl">
                <CheckCircle2 className="text-primary h-6 w-6" />
                <span>Cloud backup of your progress</span>
              </li>
              <li className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl">
                <CheckCircle2 className="text-primary h-6 w-6" />
                <span>Get insights on classes you can miss</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Standard Attendance Rules</h2>
            <p className="text-lg leading-relaxed">
              Most universities in India and around the world follow a strict 75% attendance rule. Falling below this threshold 
              can result in penalties, loss of marks, or even being ineligible for final examinations. Using our 
              <strong> college attendance tracker</strong> helps you maintain your status consistently.
            </p>
          </section>
        </article>

        <div className="mt-16 bg-primary rounded-3xl p-10 text-primary-foreground text-center">
          <h2 className="text-3xl font-bold mb-4">Stop calculating manually!</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of students who track their attendance easily with ClassTrack.</p>
          <Link href="/login">
            <Button variant="secondary" size="lg" className="h-14 px-10 text-lg">Create Free Account <ChevronRight className="ml-2" /></Button>
          </Link>
        </div>
      </main>

    </div>
  );
}
