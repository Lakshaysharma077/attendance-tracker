'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white py-20 px-6">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
        <div className="space-y-6">
          <div className="text-3xl font-black tracking-tighter text-slate-900 leading-none">
            Class<span className="text-primary italic">Track</span>
          </div>
          <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-xs">
            Leading academic presence intelligence for modern students. 
            Smart calculations, 100% free, and cloud-synced.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-8 text-slate-900 uppercase tracking-[0.2em] text-[10px]">Ecosystem</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><Link href="/attendance-tracker" className="hover:text-primary transition-colors">Attendance Tracker</Link></li>
            <li><Link href="/class-attendance-calculator" className="hover:text-primary transition-colors">Compliance Calculator</Link></li>
            <li><Link href="/bunk-calculator" className="hover:text-primary transition-colors">Bunk Assistant</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-8 text-slate-900 uppercase tracking-[0.2em] text-[10px]">Resources</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><Link href="/how-to-calculate-attendance" className="hover:text-primary transition-colors">Methodology</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Mission</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Support Center</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-8 text-slate-900 uppercase tracking-[0.2em] text-[10px]">Governance</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Framework</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-primary transition-colors">User Agreement</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl text-center text-[10px] font-bold text-slate-400 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="uppercase tracking-widest">&copy; {new Date().getFullYear()} ClassTrack Intelligence Group.</p>
        <p className="uppercase tracking-widest">Built for Academic Excellence Worldwide.</p>
      </div>
    </footer>
  );
}
