'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="container mx-auto flex items-center justify-between p-6 max-w-6xl">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline" className="font-bold border-slate-200">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-12">Last updated: March 23, 2026</p>

        <section className="space-y-12">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Data Ownership</h2>
            <p className="text-slate-600 leading-relaxed font-medium">At ClassTrack, we value your privacy as much as your time. Your academic data is yours. We do not sell, rent, or trade your personal information or class attendance records to third parties for marketing purposes.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed font-medium mb-4">We collect minimal information required to provide our service:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium">
              <li><strong>Account Details:</strong> Your email address and name when you register via Google or Email.</li>
              <li><strong>Academic Data:</strong> The names of your subjects and the attendance records you voluntarily input.</li>
              <li><strong>Usage Data:</strong> Anonymous information about how you interact with our tools to help us improve the user experience.</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Advertising & Cookies</h2>
            <p className="text-slate-600 leading-relaxed font-medium mb-4">To keep ClassTrack free for students, we use Google AdSense to serve advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites.</p>
            <p className="text-slate-600 leading-relaxed font-medium">You may opt out of personalized advertising by visiting <Link href="https://www.google.com/settings/ads" className="text-slate-900 underline">Ads Settings</Link>.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Data Security</h2>
            <p className="text-slate-600 leading-relaxed font-medium">We use industry-standard SSL encryption to protect your data during transmission. Your information is stored on secure cloud servers with restricted access.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Account Deletion</h2>
            <p className="text-slate-600 leading-relaxed font-medium">You have the right to delete your account at any time. Upon deletion, all your subjects and attendance records are permanently removed from our active databases.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed font-medium">If you have any questions about this Privacy Policy, please contact us at <span className="text-slate-900 font-bold">privacy@classtrack.com</span>.</p>
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
