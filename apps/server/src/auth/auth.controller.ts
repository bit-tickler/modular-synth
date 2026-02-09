import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { lucia, sessionCookieAttributes } from './lucia';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { sessionCookie } = await this.authService.signup(
      body.username,
      body.password,
    );
    res.cookie(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true };
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { sessionCookie } = await this.authService.login(
      body.username,
      body.password,
    );
    res.cookie(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true };
  }

  @Get('me')
  async getCurrentUser(@Req() req: Request) {
    const sessionId = req.cookies[lucia.sessionCookieName];
    if (!sessionId) return { user: null };

    const { user } = await this.authService.validateSession(sessionId);

    const safeUser = user
      ? { id: user.id, username: (user as any).username }
      : null;
    return { user: safeUser };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(lucia.sessionCookieName, sessionCookieAttributes);
    return { success: true };
  }
}
