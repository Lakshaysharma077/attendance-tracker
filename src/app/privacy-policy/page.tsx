'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="container mx-auto flex items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="space-y-8 text-foreground/90">
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>Welcome to ClassTrack (class-track.live). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you register on the website, such as email addresses and class data. We also collect certain information automatically when you visit, use or navigate the website (like IP address and browser characteristics).</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. Cookie Usage and Advertising</h2>
            <p className="mb-4">We use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies is set out in our Cookie Policy.</p>
            <div className="bg-secondary p-6 rounded-xl border border-border">
              <h3 className="font-bold mb-2">Google AdSense</h3>
              <p>We use third-party advertising companies such as Google AdSense to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. How We Use Your Information</h2>
            <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>We aim to protect your personal information through a system of organizational and technical security measures. However, please also remember that we cannot guarantee that the internet itself is 100% secure.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p>If you have questions or comments about this policy, you may email us through our contact page.</p>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ClassTrack. All rights reserved.</p>
      </footer>
    </div>
  );
}
