import { Controller, Post, Body } from '@nestjs/common';

import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() { email, password }: LoginUserDto) {
    return { email, password };
  }
}
