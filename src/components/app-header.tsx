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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 transition-all duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="text-2xl font-black tracking-tighter text-slate-900 group cursor-default">
            Class<span className="text-primary italic group-hover:not-italic transition-all">Track</span>
          </div>
          <div className="flex items-center gap-6">
            {user && (
              <Button 
                size="sm" 
                onClick={onAddSubject}
                className="rounded-xl shadow-lg shadow-primary/10 hover:shadow-xl transition-all h-10 px-5 font-bold bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Subject
              </Button>
            )}
            {isLoading ? (
              <Skeleton className="h-9 w-9 rounded-full" />
            ) : user && auth ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full border border-slate-200 hover:bg-slate-50 transition-all p-0 overflow-hidden"
                  >
                    <Avatar className="h-full w-full">
                      <AvatarImage
                        src={user.photoURL ?? ''}
                        alt={user.displayName ?? ''}
                      />
                      <AvatarFallback className="font-bold bg-slate-100 text-slate-600">{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-white border border-slate-200 rounded-2xl p-1 shadow-2xl mt-2" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal p-4">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold text-slate-900 leading-none">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-slate-500 font-medium truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100" />
                  <DropdownMenuItem onClick={handleSignOut} className="rounded-xl m-1 focus:bg-destructive/5 focus:text-destructive text-slate-700 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Log out</span>
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
