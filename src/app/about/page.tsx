'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Target, Heart, ShieldCheck, Zap, BookOpen, Clock, BarChart3, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="container mx-auto flex items-center justify-between p-6 max-w-6xl">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline" className="font-bold border-slate-200">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider mb-6">
            <Target className="h-3 w-3" />
            Our Mission
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-slate-900 mb-8">
            Built for Students, <br /><span className="text-slate-500">By Those Who've Been There.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            ClassTrack was founded on a simple realization: the hardest part of college isn't the exams—it's the organization. We're here to lift that mental load.
          </p>
        </div>

        <div className="prose prose-slate max-w-none mb-20 text-slate-600 leading-relaxed font-medium">
          <p className="mb-6">
            At ClassTrack, we remember what it was like to stare at a spreadsheet at midnight, trying to calculate if we could afford to miss a Tuesday morning lecture to finish a Friday assignment. The "attendance math" shouldn't be your hardest subject.
          </p>
          <p className="mb-6">
            Our mission is simple: To provide students with professional-grade productivity tools that feel human, not corporate. We believe that when students have clarity over their schedule, their mental health improves, and their grades follow.
          </p>
          <p>
            ClassTrack was born in a dorm room and refined through the feedback of thousands of students worldwide. We are here to help you navigate the chaos of academia with confidence, ensuring you never miss a goal—or a class—unintentionally.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            {
              icon: <Zap className="h-6 w-6 text-slate-900" />,
              title: "Modern Tools",
              desc: "We combine cutting-edge technology with minimalist design to create an experience that's as fast as it is beautiful."
            },
            {
              icon: <Users className="h-6 w-6 text-slate-900" />,
              title: "Community Driven",
              desc: "Every feature we build is based on real feedback from students facing real academic challenges."
            },
            {
              icon: <ShieldCheck className="h-6 w-6 text-slate-900" />,
              title: "Privacy First",
              desc: "Your academic data is sensitive. We use industry-standard encryption to ensure your records stay yours."
            },
            {
              icon: <Heart className="h-6 w-6 text-slate-900" />,
              title: "Free Access",
              desc: "We believe essential organization tools should be accessible to every student, everywhere, for free."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
              <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to reclaim your time?</h2>
            <p className="text-slate-400 mb-8 font-medium max-w-md mx-auto">Join thousands of students who are staying organized and avoiding the attendance danger zone.</p>
            <Link href="/login">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 rounded-xl">Get Started Now</Button>
            </Link>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-slate-800 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-slate-800 rounded-full blur-3xl opacity-50"></div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-12 mt-20">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-black tracking-tighter text-slate-900">ClassTrack</div>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="text-xs font-bold text-slate-500 hover:text-slate-900 uppercase tracking-widest">Privacy</Link>
            <Link href="/terms-and-conditions" className="text-xs font-bold text-slate-500 hover:text-slate-900 uppercase tracking-widest">Terms</Link>
            <Link href="/contact" className="text-xs font-bold text-slate-500 hover:text-slate-900 uppercase tracking-widest">Contact</Link>
          </div>
          <div className="text-xs font-bold text-slate-400">© 2026 ClassTrack. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
