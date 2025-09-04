'use client';

import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          ExpatsJobs.cz
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/jobs" className="text-gray-600 hover:text-primary">
            Browse Jobs
          </Link>
          <Link href="/cv-builder" className="text-gray-600 hover:text-primary">
            CV AI Builder
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {status === 'loading' ? (
            <div className="h-9 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : session ? (
            <>
              {session.user.userType === 'employer' && (
                <Button asChild variant="outline">
                  <Link href="/post-job">Post a Job</Link>
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{session.user.name || session.user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={session.user.userType === 'employer' ? '/dashboard' : '/profile'}>
                      {session.user.userType === 'employer' ? 'Dashboard' : 'My Profile'}
                    </Link>
                  </DropdownMenuItem>
                  {session.user.userType === 'job_seeker' && (
                    <DropdownMenuItem asChild>
                      <Link href="/favorites">Saved Jobs</Link>
                    </DropdownMenuItem>
                  )}
                  {session.user.userType === 'employer' && (
                    <DropdownMenuItem asChild>
                      <Link href="/my-jobs">My Jobs</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}