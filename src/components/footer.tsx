'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="text-2xl font-bold text-foreground">ClassTrack</div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Leading attendance tracking and management tool for modern students. 
            Smart calculations, 100% free, and cloud-synced.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-xs">Tools</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/attendance-tracker" className="hover:text-primary transition-colors">Attendance Tracker</Link></li>
            <li><Link href="/class-attendance-calculator" className="hover:text-primary transition-colors">Calculator</Link></li>
            <li><Link href="/bunk-calculator" className="hover:text-primary transition-colors">Bunk Calculator</Link></li>
            <li><Link href="/75-attendance-calculator" className="hover:text-primary transition-colors">75% Calculator</Link></li>
            <li><Link href="/attendance-percentage-calculator" className="hover:text-primary transition-colors">Percentage Tool</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-xs">Guides</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/how-to-calculate-attendance" className="hover:text-primary transition-colors">How to Calculate</Link></li>
            <li><Link href="/student-attendance-tracker" className="hover:text-primary transition-colors">Student Guide</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About ClassTrack</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Help & Support</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-xs">Legal</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-center text-xs text-muted-foreground pt-8 border-t">
        <p>&copy; {new Date().getFullYear()} ClassTrack. Proudly serving students worldwide.</p>
      </div>
    </footer>
  );
}
