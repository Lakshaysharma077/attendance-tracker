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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 transition-all duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex h-14 items-center justify-between">
          <div className="text-xl font-bold tracking-tight text-slate-900">
            ClassTrack
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <Button 
                size="sm" 
                onClick={onAddSubject}
                className="rounded-lg h-9 px-4 font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
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
                    className="relative h-8 w-8 rounded-full border border-slate-100 hover:bg-slate-50 transition-colors p-0 overflow-hidden"
                  >
                    <Avatar className="h-full w-full">
                      <AvatarImage
                        src={user.photoURL ?? ''}
                        alt={user.displayName ?? ''}
                      />
                      <AvatarFallback className="text-[10px] font-bold bg-slate-50 text-slate-400">{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-slate-100 rounded-xl p-1 shadow-md mt-2" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 leading-none">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-50" />
                  <DropdownMenuItem onClick={handleSignOut} className="rounded-lg m-1 focus:bg-destructive/5 focus:text-destructive text-slate-600 cursor-pointer text-xs font-medium">
                    <LogOut className="mr-2 h-3.5 w-3.5" />
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
