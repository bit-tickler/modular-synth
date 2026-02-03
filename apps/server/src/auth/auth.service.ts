import { Injectable } from '@nestjs/common';
import { hash, verify } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import { PrismaService } from '../prisma/prisma.service';
import { getLucia } from './lucia';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {
    getLucia(prisma); // force init
  }

  private get lucia() {
    return getLucia(this.prisma);
  }

  async signup(username: string, password: string) {
    const userId = generateIdFromEntropySize(10);
    const passwordHash = await hash(password);

    const user = await this.prisma.user.create({
      data: { id: userId, username, passwordHash },
    });

    const session = await this.lucia.createSession(user.id, {});
    const sessionCookie = this.lucia.createSessionCookie(session.id);

    return { sessionCookie };
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user || !(await verify(user.passwordHash, password))) {
      throw new Error('Invalid credentials');
    }

    const session = await this.lucia.createSession(user.id, {});
    const sessionCookie = this.lucia.createSessionCookie(session.id);

    return { sessionCookie };
  }

  async validateSession(sessionId: string) {
    return this.lucia.validateSession(sessionId);
  }
}
