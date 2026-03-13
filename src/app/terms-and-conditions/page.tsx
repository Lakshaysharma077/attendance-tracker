'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="container mx-auto flex items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="space-y-8 text-foreground/90">
          <div>
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using ClassTrack, you agree to be bound by these terms and conditions. If you disagree with any part of the terms, you may not access the service.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
            <p>The service and its original content, features, and functionality are and will remain the exclusive property of ClassTrack and its licensors.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the terms, which may result in immediate termination of your account on our service.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
            <p>In no event shall ClassTrack, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Governing Law</h2>
            <p>These terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company operates, without regard to its conflict of law provisions.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">6. Changes</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ClassTrack. All rights reserved.</p>
      </footer>
    </div>
  );
}
