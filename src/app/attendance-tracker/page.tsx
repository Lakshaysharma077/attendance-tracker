'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, LayoutDashboard, LineChart, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AttendanceTrackerPage() {
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
            The Best <span className="text-primary">Attendance Tracker</span> for College Students
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Stop worrying about your attendance percentages. Class Track is a free, simple, and 
            powerful tool designed to help you manage your classes and stay eligible for exams.
          </p>
          <div className="mt-10">
            <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-lg">Start Tracking for Free</Button>
            </Link>
          </div>
        </section>

        {/* Informational Content */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold">Why you need an online attendance tracker</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    College life is busy. Between lectures, labs, and social life, keeping track of 
                    how many classes you've attended for each subject can be a nightmare. 
                    A dedicated <strong>attendance tracker</strong> simplifies this by:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>Eliminating manual calculation errors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>Providing instant visibility into your eligibility</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span>Helping you plan which classes you can afford to miss</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-3xl bg-card p-8 shadow-sm">
                <h3 className="text-xl font-bold italic text-primary">"Class Track is my go-to student attendance tracker. It's clean, fast, and exactly what I needed!"</h3>
                <p className="mt-4 font-medium">— Engineering Student</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features list specifically for SEO */}
        <section className="container mx-auto py-20 px-6">
          <h2 className="text-center text-3xl font-bold">Features of our Student Attendance Tracker</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: LayoutDashboard, title: "Modern Dashboard", desc: "A premium UI that feels natural and easy to use on any device." },
              { icon: LineChart, title: "Dynamic Calculations", desc: "Get real-time insights into your attendance status as you mark present or absent." },
              { icon: ShieldCheck, title: "Secure Data", desc: "Your data is stored securely in the cloud, accessible from anywhere." }
            ].map((feature, i) => (
              <div key={i} className="rounded-2xl border p-8 hover:border-primary/50 transition-colors">
                <feature.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto mb-20 px-6">
          <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to take control of your attendance?</h2>
            <p className="mt-4 text-lg opacity-90">Join thousands of students using Class Track today.</p>
            <div className="mt-8 flex justify-center">
              <Link href="/login">
                <Button variant="secondary" size="lg" className="h-14 px-8 text-lg flex items-center gap-2">
                  Get Started <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ClassTrack - The #1 Attendance Tracker for Students.</p>
      </footer>
    </div>
  );
}
