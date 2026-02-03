import { Injectable } from '@nestjs/common';
import { hash, verify } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import { PrismaService } from '../prisma/prisma.service';
import { createLucia } from './lucia';
import type { Lucia } from 'lucia';

@Injectable()
export class AuthService {
  private lucia: Lucia;

  constructor(private readonly prisma: PrismaService) {
    this.lucia = createLucia(prisma);
  }

  async signup(username: string, password: string) {
    const userId = generateIdFromEntropySize(10);
    const passwordHash = await hash(password);

    const user = await this.prisma.user.create({
      data: { id: userId, username, passwordHash },
    });

    const session = await this.lucia.createSession(user.id, {});
    const sessionCookie = this.lucia.createSessionCookie(session.id);

    return { user, sessionCookie };
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new Error('Invalid credentials');

    const valid = await verify(user.passwordHash, password);
    if (!valid) throw new Error('Invalid credentials');

    const session = await this.lucia.createSession(user.id, {});
    const sessionCookie = this.lucia.createSessionCookie(session.id);

    return { user, sessionCookie };
  }
}
