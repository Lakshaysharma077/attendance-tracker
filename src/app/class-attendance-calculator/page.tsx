'use client';

import { Button } from '@/components/ui/button';
import { Calculator, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import Link from 'next/link';

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="container mx-auto flex items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary focus:outline-none">ClassTrack</Link>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Class <span className="text-primary">Attendance Calculator</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Wondering how many more classes you need to attend to hit your 75% or 85% goal? 
            Our smart calculator tells you exactly what you need to do.
          </p>
          <div className="mt-10">
            <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5" /> Use Calculator for Free
              </Button>
            </Link>
          </div>
        </section>

        {/* Calculator Benefits */}
        <section className="bg-secondary py-24">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold md:text-4xl">Say goodbye to manual math</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground text-lg">
                Calculated your attendance on paper? Forget that. Our <strong>class attendance calculator</strong> 
                handles all the complex logic for you instantly.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-3xl bg-card p-10 shadow-sm border border-border">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Calculator className="h-6 w-6 text-primary" />
                  What it calculates
                </h3>
                <ul className="mt-6 space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>Your current attendance percentage across any number of subjects.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>The exact number of future classes you can SAFELY miss.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <span>The number of CONSECUTIVE classes you must attend to recover.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl bg-card p-10 shadow-sm border border-border">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Info className="h-6 w-6 text-primary" />
                  Why accurate calculations matter
                </h3>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Most colleges have strict attendance policies. Missing even one extra class can 
                  result in being debarred from exams. Using an <strong>attendance percentage calculator</strong> 
                  gives you the confidence to manage your time effectively while staying safe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto my-24 px-6 text-center">
          <h2 className="text-3xl font-bold">Don't risk your grades.</h2>
          <p className="mt-4 text-xl text-muted-foreground">Start using the smart calculator today.</p>
          <div className="mt-10 flex justify-center">
             <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-lg flex items-center gap-2">
                Create Free Account <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ClassTrack - Professional Attendance Calculator for Students.</p>
      </footer>
    </div>
  );
}
