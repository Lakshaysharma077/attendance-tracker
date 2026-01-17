'use client';

import { ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from '.';

// This is a client-side only provider that ensures Firebase is initialized once.
export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const firebase = initializeFirebase();
  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}
