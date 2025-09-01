import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      userType: 'employer' | 'job_seeker';
    } & DefaultSession['user'];
  }

  interface User {
    userType: 'employer' | 'job_seeker';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userType: 'employer' | 'job_seeker';
  }
}