'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from './ui/skeleton';

export function AppHeader({ onAddSubject }: { onAddSubject: () => void }) {
  const auth = useAuth();
  const { user, isLoading } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    // 1. ZABARDASTI LOCK HATAO (Safety Guard for scroll issues)
    document.body.style.pointerEvents = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    document.documentElement.style.overflow = 'auto';
    document.body.removeAttribute('data-scroll-locked');

    // 2. Thoda ruk k logout karo taaki dropdown close hone ka time mile
    setTimeout(async () => {
      try {
        if (auth) {
          await signOut(auth);
          router.push('/login');
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    }, 150);
  };

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email[0].toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-6xl">
        <div className="text-xl font-black tracking-tighter text-slate-900">
          ClassTrack
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <Button
              onClick={onAddSubject}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg h-10 px-6"
            >
              Add Subject
            </Button>
          )}

          {isLoading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user && auth ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full border border-slate-100 hover:bg-slate-50 transition-colors p-0 overflow-hidden"
                >
                  <Avatar className="h-full w-full">
                    <AvatarImage
                      src={user.photoURL ?? ''}
                      alt={user.displayName ?? ''}
                    />
                    <AvatarFallback className="text-xs font-bold bg-slate-50 text-slate-400">
                      {getInitials(user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent
                  align="end"
                  className="w-56 p-2 rounded-xl border border-slate-100 bg-white shadow-xl mt-2 animate-in fade-in-0 zoom-in-95"
                >
                  <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none text-slate-900">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs font-medium leading-none text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-2 bg-slate-100" />

                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer font-bold rounded-lg p-2.5"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </header>
  );
}