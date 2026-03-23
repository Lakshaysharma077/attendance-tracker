'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="container mx-auto flex items-center justify-between p-6 max-w-6xl">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline" className="font-bold border-slate-200">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Terms & Conditions</h1>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-12">Last updated: March 23, 2026</p>

        <section className="space-y-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed font-medium">By accessing and using ClassTrack, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our service.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
            <p className="text-slate-600 leading-relaxed font-medium">ClassTrack provides a web-based platform for students to track their academic attendance, schedule classes, and manage productivity. The service is provided "as is" and "as available."</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. User Responsibility</h2>
            <p className="text-slate-600 leading-relaxed font-medium mb-4">While ClassTrack helps you manage your attendance, please note:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium">
              <li>You are responsible for the accuracy of the data you input.</li>
              <li>Official attendance records maintained by your educational institution are the final authority for administrative decisions.</li>
              <li>ClassTrack is a personal organization tool and does not guarantee academic performance or eligibility.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed font-medium">All content, features, and functionality on ClassTrack—including text, graphics, logos, and software—are the exclusive property of ClassTrack and are protected by international copyright and trademark laws.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed font-medium">In no event shall ClassTrack be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the service.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">6. Modifications to Service</h2>
            <p className="text-slate-600 leading-relaxed font-medium">We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice at any time.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-12 mt-20">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">© 2026 ClassTrack. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
