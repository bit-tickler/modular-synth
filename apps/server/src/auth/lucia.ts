import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import type { PrismaClient } from '@prisma/client';

export const createLucia = (prisma: PrismaClient) => {
  const adapter = new PrismaAdapter(prisma.session, prisma.user);

  return new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    },
    getUserAttributes: (attributes) => ({
      username: attributes.username,
    }),
  });
};

declare module 'lucia' {
  interface Register {
    Lucia: ReturnType<typeof createLucia>;
    DatabaseUserAttributes: {
      username: string;
    };
  }
}
