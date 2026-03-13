'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronRight, GraduationCap, Laptop, Share2, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function StudentTrackerPage() {
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
            Ultimate <span className="text-primary">Student Attendance Tracker</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            The all-in-one companion for modern students. Track, calculate, and manage 
            your attendance effortlessly on Any Device.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5" /> Sign Up as a Student
              </Button>
            </Link>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-primary/5 py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-3xl font-bold md:text-4xl">Built for every type of student</h2>
            <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                  <Laptop className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">University & College</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed text-lg">
                    Perfect for university students with complex timetables and strict 
                    <strong> attendance tracker for college</strong> requirements. 
                    Manage multiple subjects with different thresholds effortlessly.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Mobile Access</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed text-lg">
                    Mark your attendance directly from your phone as soon as the class ends. 
                    Our responsive <strong>online class attendance tracker</strong> works 
                    perfectly on any mobile browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Table/List */}
        <section className="container mx-auto py-24 px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold italic text-primary underline decoration-wavy underline-offset-8">Track Smarter, Not Harder</h2>
          </div>
          <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              "Automated Percentage Tracking",
              "Custom Subject Labels",
              "Offline Capability (PWA/Android)",
              "Beautiful Dark & Light Mode",
              "Real-time Data Sync",
              "One-Click Attendance Updates",
              "Missing Class Thresholds",
              "Completely Free to Use"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card/50">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto mb-24 px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-20 text-center text-white">
             {/* Decorative Background Element */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
            
            <h2 className="relative z-10 text-4xl font-bold md:text-5xl">Join ClassTrack Today</h2>
            <p className="relative z-10 mt-6 text-xl text-slate-400">The most loved student attendance tracker on the web.</p>
            <div className="relative z-10 mt-12 flex justify-center gap-4 flex-col sm:flex-row">
              <Link href="/login">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full">Get Started for Free</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ClassTrack - The Ultimate Student Productivity Tool.</p>
      </footer>
    </div>
  );
}
