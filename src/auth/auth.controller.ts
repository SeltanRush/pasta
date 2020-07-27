import { Controller, Post, Body } from '@nestjs/common';

import { LoginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }
}
