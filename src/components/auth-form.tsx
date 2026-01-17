'use client';

import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className="h-4 w-4"
  >
    <title>Google</title>
    <path
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.36 1.67-4.66 1.67-3.86 0-6.99-3.16-6.99-7.02s3.13-7.02 6.99-7.02c2.2 0 3.29.81 4.1 1.62l2.33-2.33C18.49.39 15.99 0 12.48 0 5.88 0 .02 5.66.02 12.48s5.86 12.48 12.46 12.48c3.34 0 5.76-1.12 7.74-3.15 2.06-2.06 2.68-4.88 2.68-7.88 0-.6-.05-1.18-.15-1.73z"
      fill="#4285F4"
    />
  </svg>
);

export function AuthForm() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    if (!auth || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Authentication service not available. Please try again later.',
      });
      setIsGoogleLoading(false);
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
        toast({
          title: 'Account Created',
          description: 'Welcome! Your account has been created with Google.',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Logged in successfully with Google.',
        });
      }
      router.push('/');
    } catch (error: any) {
       const errorMessage =
        error.code === 'auth/configuration-not-found'
          ? 'The Google sign-in provider is not enabled. Please contact support.'
          : error.message;
      toast({
        variant: 'destructive',
        title: 'Google Sign-In Failed',
        description: errorMessage,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Welcome</CardTitle>
        <CardDescription>
          Sign in with your Google account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || !auth}
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon className="mr-2" />
            )}
            Continue with Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
