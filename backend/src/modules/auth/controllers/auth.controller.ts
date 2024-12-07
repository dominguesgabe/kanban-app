import { Body, Controller, Post } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { LoginDTO } from '../dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDTO: LoginDTO): Promise<UpdateResult> {
    return this.authService.login(loginDTO);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
