'use client';

import { Button } from '@/components/ui/button';
import { Plus, LogOut } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from './ui/skeleton';

type AppHeaderProps = {
  onAddSubject: () => void;
};

export function AppHeader({ onAddSubject }: AppHeaderProps) {
  const auth = useAuth();
  const { user, isLoading } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  };

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email[0].toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <h1 className="font-headline text-2xl font-bold text-foreground">
            ClassTrack
          </h1>
          <div className="flex items-center gap-4">
            {user && (
              <Button
                onClick={onAddSubject}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Subject
              </Button>
            )}
            {isLoading ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : user && auth ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.photoURL ?? ''}
                        alt={user.displayName ?? ''}
                      />
                      <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
