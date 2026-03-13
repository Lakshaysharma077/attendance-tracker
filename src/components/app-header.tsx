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
    <header className="sticky top-0 z-50 glass-3d border-b border-white/20 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <div className="text-3xl font-black tracking-tighter text-foreground drop-shadow-md">
            Class<span className="text-primary italic">Track</span>
          </div>
          <div className="flex items-center gap-6">
            {user && (
              <Button 
                size="lg" 
                onClick={onAddSubject}
                className="rounded-2xl shadow-3d-primary hover:scale-[1.02] active:scale-95 transition-all h-12 px-6 font-bold border-t border-white/20"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Subject
              </Button>
            )}
            {isLoading ? (
              <Skeleton className="h-10 w-10 rounded-[1.2rem]" />
            ) : user && auth ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-12 w-12 rounded-[1.2rem] glass-3d border-white/40 hover:bg-white/30 transition-all p-0 overflow-hidden shadow-lg"
                  >
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage
                        src={user.photoURL ?? ''}
                        alt={user.displayName ?? ''}
                      />
                      <AvatarFallback className="rounded-none font-black">{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 glass-3d border-white/20 rounded-2xl p-2 mt-2" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-black leading-none uppercase tracking-tighter">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground font-medium italic">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={handleSignOut} className="rounded-xl mt-1 focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="font-bold">Log out</span>
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
