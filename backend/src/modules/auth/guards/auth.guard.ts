import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const jwtSecret = process.env.JWT_SECRET || 'secret';

      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });

      const isValidSession = await this.authService.validateSession(
        payload.email,
        payload.token,
      );

      if (!isValidSession) {
        throw new UnauthorizedException('Invalid Session');
      }

      request['user'] = payload;
    } catch (error: any) {
      throw new UnauthorizedException(`${error.message}`);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
