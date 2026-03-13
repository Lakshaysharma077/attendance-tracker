'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, MessageCircle, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="container mx-auto flex items-center justify-between p-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary">ClassTrack</Link>
        <Link href="/login">
          <Button variant="outline">Sign In</Button>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl mb-6">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Have questions, feedback, or a feature request? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-6 p-6 rounded-2xl border bg-card/50">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Email Us</h3>
                <p className="text-muted-foreground">For support or inquiries:</p>
                <p className="font-semibold text-primary mt-1">support@class-track.live</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-2xl border bg-card/50">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Feedback</h3>
                <p className="text-muted-foreground">Help us improve the tracker:</p>
                <p className="font-semibold text-primary mt-1">@ClassTrackApp on Social</p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-2xl border bg-card/50">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Location</h3>
                <p className="text-muted-foreground">Operating virtually to serve students worldwide.</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-3xl p-8 flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold mb-4">Response Time</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We typically respond to all emails within 24-48 hours. Please provide your 
              registered email address for account-specific issues.
            </p>
            <Button size="lg" className="w-full" asChild>
              <a href="mailto:support@class-track.live">Send Message Now</a>
            </Button>
          </div>
        </div>
      </main>

    </div>
  );
}
