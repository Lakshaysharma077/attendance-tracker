'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, MessageSquare, Globe, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="container mx-auto flex items-center justify-between p-6 max-w-6xl">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline" className="font-bold border-slate-200">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-slate-900 mb-6">
            We're Here to <span className="text-slate-500">Help.</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-xl mx-auto">
            Have a question, feedback, or just want to share a success story? Our team is always ready to listen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: <Mail className="h-6 w-6 text-slate-900" />,
              title: "General Support",
              contact: "support@classtrack.com",
              desc: "For help with your account or technical issues."
            },
            {
              icon: <MessageSquare className="h-6 w-6 text-slate-900" />,
              title: "Feedback",
              contact: "ideas@classtrack.com",
              desc: "Share your feature requests and suggestions."
            },
            {
              icon: <Globe className="h-6 w-6 text-slate-900" />,
              title: "Business",
              contact: "admin@classtrack.com",
              desc: "For partnership and press inquiries."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 mx-auto">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-900 font-bold text-sm mb-4">{item.contact}</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                <input type="text" className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all outline-none" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                <input type="email" className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all outline-none" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message</label>
              <textarea className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all outline-none resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl">
              Send Message
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-12 mt-20">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">© 2026 ClassTrack. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
