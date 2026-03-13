'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Target, CheckCircle2, ScrollText, Timer } from 'lucide-react';

export default function Attendance75Page() {
  return (
    <div className="min-h-screen bg-background text-foreground/90 font-sans">
      <nav className="container mx-auto flex items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline" className="rounded-full">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <header className="mb-16 text-center">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-widest">Target Achievement</div>
          <h1 className="text-4xl font-extrabold mb-6 md:text-7xl tracking-tighter leading-none">
            75% Attendance <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The specialized tool to help you reach and maintain the mandatory 75% attendance rule followed by universities worldwide.
          </p>
        </header>
        
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 mb-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Struggling to reach 75%?</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                If your attendance has dropped below 75%, our calculator tells you exactly how many consecutive classes you need to attend without a single absence to get back on track.
              </p>
              <Link href="/login">
                <Button size="lg" className="h-14 px-8 text-lg rounded-xl">Calculate 75% Status Now</Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-full border-8 border-primary/30 flex items-center justify-center relative">
                 <div className="absolute inset-0 border-8 border-primary rounded-full animate-pulse" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)' }}></div>
                 <span className="text-4xl font-black">75%</span>
              </div>
            </div>
          </div>
        </div>

        <article className="space-y-16">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border bg-card hover:border-primary/50 transition-colors">
              <Target className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Set Goal</h3>
              <p className="text-muted-foreground">Define your target percentage, whether it's 75%, 80%, or even a perfect 100%.</p>
            </div>
            <div className="p-8 rounded-3xl border bg-card hover:border-primary/50 transition-colors">
              <Timer className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Track Time</h3>
              <p className="text-muted-foreground">Monitor your progress daily as the semester progresses towards the final exam.</p>
            </div>
            <div className="p-8 rounded-3xl border bg-card hover:border-primary/50 transition-colors">
              <ScrollText className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Detailed Logs</h3>
              <p className="text-muted-foreground">Keep a history of every class attended and missed for each individual subject.</p>
            </div>
          </section>

          <section className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-black mb-8">What is the 75 Percent Attendance Rule?</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              The 75% attendance rule is a common policy in educational institutions (especially in India, USA, and UK) which mandates that a student must attend at least three-quarters of the total classes conducted. 
              Failure to meet this requirement can lead to being barred from taking semester examinations.
            </p>
            <div className="bg-secondary/50 p-8 rounded-3xl border border-dashed border-primary/30">
              <h3 className="text-xl font-bold mb-4">Why Universities Enforce This:</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary h-5 w-5" />
                  <span>Ensures consistent classroom learning</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary h-5 w-5" />
                  <span>Promotes discipline among students</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary h-5 w-5" />
                  <span>Allows for peer-to-peer discussions</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary h-5 w-5" />
                  <span>Better internal assessment scores</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="text-center py-20 bg-primary/5 rounded-[3rem]">
            <h2 className="text-3xl font-black mb-6">Never fall below 75% again.</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join the smart student community. Start tracking your attendance on the cloud for free with ClassTrack.
            </p>
            <Link href="/login">
              <Button size="lg" className="h-16 px-12 text-xl rounded-full shadow-lg hover:shadow-primary/20 transition-all">Get Started for Free</Button>
            </Link>
          </section>
        </article>
      </main>

      <footer className="border-t py-12 text-center text-muted-foreground mt-20">
        <p>&copy; {new Date().getFullYear()} ClassTrack - The Ultimate 75% Attendance Helper.</p>
      </footer>
    </div>
  );
}
