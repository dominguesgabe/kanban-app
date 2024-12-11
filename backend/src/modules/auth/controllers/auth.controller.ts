import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { LoginDTO } from '../dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDTO: LoginDTO): Promise<User> {
    return this.authService.login(loginDTO);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
