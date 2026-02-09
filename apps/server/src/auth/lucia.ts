import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import type { PrismaClient } from '@prisma/client';

let instance: Lucia | null = null;

export const sessionCookieAttributes = {
  secure: process.env.NODE_ENV === 'production',
  sameSite:
    process.env.NODE_ENV === 'production'
      ? ('none' as const)
      : ('lax' as const),
  httpOnly: true,
  path: '/',
};

export function getLucia(prisma: PrismaClient): Lucia {
  if (instance) return instance;

  const adapter = new PrismaAdapter(prisma.session, prisma.user);

  instance = new Lucia(adapter, {
    sessionCookie: {
      attributes: sessionCookieAttributes,
    },
    getUserAttributes: (attr) => ({ username: attr.username }),
  });

  return instance;
}

// Safe proxy – never null
export const lucia = {
  get sessionCookieName() {
    if (!instance) throw new Error('Lucia not initialized');
    return instance.sessionCookieName;
  },
  createSession(userId: string, data: any) {
    if (!instance) throw new Error('Lucia not initialized');
    return instance.createSession(userId, data);
  },
  createSessionCookie(sessionId: string) {
    if (!instance) throw new Error('Lucia not initialized');
    return instance.createSessionCookie(sessionId);
  },
  validateSession(sessionId: string) {
    if (!instance) throw new Error('Lucia not initialized');
    return instance.validateSession(sessionId);
  },
};

declare module 'lucia' {
  interface Register {
    Lucia: Lucia;
    DatabaseUserAttributes: { username: string };
  }
}
