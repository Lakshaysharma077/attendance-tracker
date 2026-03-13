import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Class Track - Smart Attendance Tracker for Students & Teachers',
  description: 'Track your class attendance easily with Class Track. A simple attendance tracker for students to monitor attendance percentage and manage classes.',
  keywords: ['class tracker', 'attendance tracker', 'student attendance tracker', 'attendance percentage calculator'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
