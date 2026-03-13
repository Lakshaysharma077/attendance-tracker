'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calculator, CheckCircle2, AlertTriangle, HelpCircle, ChevronRight } from 'lucide-react';

export default function BunkCalculatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground/90 font-sans">
      <nav className="container mx-auto flex items-center justify-between p-6 border-b border-border/40">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline" className="rounded-full">Dashboard</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-16 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-black mb-6 md:text-7xl tracking-tighter">
            Bunk <span className="text-primary italic underline decoration-wavy underline-offset-8">Calculator</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find out exactly how many classes you can safely skip while staying above your attendance goal.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-card border p-8 rounded-[2rem] shadow-sm flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
              <Calculator size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Smart Calculation</h2>
            <p className="text-muted-foreground mb-8">Our algorithm tells you the maximum consecutive classes you can miss right now.</p>
            <Link href="/login" className="w-full">
              <Button className="w-full h-12 rounded-xl text-lg">Use Bunk Calculator</Button>
            </Link>
          </div>
          <div className="bg-primary p-8 rounded-[2rem] text-primary-foreground flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              Pro Tip
            </h2>
            <p className="text-lg opacity-90 leading-relaxed mb-6">
              Always aim for a 2-3% buffer above your college's requirement to account for unexpected emergencies or system errors in recording.
            </p>
            <div className="text-sm border-t border-primary-foreground/20 pt-4 opacity-80 italic">
              *Calculations are for educational purposes only.
            </div>
          </div>
        </div>

        <article className="prose prose-headings:font-black prose-p:text-lg prose-p:leading-relaxed max-w-none space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-6">How do I know how many classes I can bunk?</h2>
            <p>
              The "Bunk Calculator" logic depends on your target attendance percentage. If your current percentage is higher than your target (e.g., target is 75%), you have a surplus of attended classes. 
              Our calculator determines how many "absent" markings can be added without letting the final ratio drop below 0.75.
            </p>
            <p className="mt-4">
              For students using ClassTrack, this calculation happens in real-time. We show you the "Safe Bunks" value for every subject on your dashboard.
            </p>
          </section>

          <section className="bg-secondary/40 p-10 rounded-[2.5rem] border border-border">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <HelpCircle className="text-primary h-8 w-8" />
              Why Students Use a Bunk Calculator?
            </h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary h-6 w-6 shrink-0 mt-1" />
                <span><strong>Exam Preparation:</strong> Needing extra time to study for a difficult subject.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary h-6 w-6 shrink-0 mt-1" />
                <span><strong>Personal Emergencies:</strong> Tracking leeway for health or family reasons.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary h-6 w-6 shrink-0 mt-1" />
                <span><strong>Extracurriculars:</strong> Managing time for sports, festivals, or club activities.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-6">Is Bunking Legal in College?</h2>
            <p>
              Most educational institutions don't use the term "bunking," but they do define a minimum attendance requirement. 
              As long as you stay above the 75% or 80% mark defined by your university, you remain eligible. 
              Using an <strong>attendance tracker for students</strong> is the most responsible way to manage this delicate balance.
            </p>
          </section>
        </article>

        <div className="mt-20 text-center border-t pt-12">
          <p className="text-muted-foreground mb-4">Ready to start tracking your bunks?</p>
          <Link href="/login">
            <Button size="lg" className="rounded-full px-12 group h-14 text-lg">
              Join ClassTrack Today
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </main>

      <footer className="py-12 text-center text-muted-foreground text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/privacy-policy" className="hover:text-primary underline-offset-4 hover:underline">Privacy</Link>
          <Link href="/terms-and-conditions" className="hover:text-primary underline-offset-4 hover:underline">Terms</Link>
          <Link href="/contact" className="hover:text-primary underline-offset-4 hover:underline">Contact</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} ClassTrack - Smart Bunk Calculation.</p>
      </footer>
    </div>
  );
}
