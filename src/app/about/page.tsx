'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2, Users, Rocket, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="container mx-auto flex items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl mb-6">
            About <span className="text-primary">ClassTrack</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Empowering students to take control of their academic life through smart, 
            simple, and effective attendance management.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              ClassTrack was born out of a simple problem: the stress of managing college attendance. 
              We believe that students should focus on learning, not on manual math to stay eligible 
              for exams. Our mission is to provide a free, premium tool that does the heavy lifting for you.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Rocket className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h3 className="font-bold">Fast & Efficient</h3>
                <p className="text-sm text-muted-foreground">Optimized for speed so you can mark attendance in seconds.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h3 className="font-bold">Student-Centric</h3>
                <p className="text-sm text-muted-foreground">Built by understanding the unique needs of college life.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-primary shrink-0" />
              <div>
                <h3 className="font-bold">Privacy First</h3>
                <p className="text-sm text-muted-foreground">Your data is yours. We use secure cloud infrastructure.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>100% Free Forever</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>No Annoying Popups</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>Real-time Syncing</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>Mobile-Friendly UI</span>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
