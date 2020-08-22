import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { getPayload } from 'utils/jwt/getPayload';

import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginUserDto) {
    const user = await this.userService.findByEmail({ email: loginDto.email });
    if (user && (await compare(loginDto.password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: LoginUserDto) {
    return this.validateUser(user).then(userData => {
      if (!userData) {
        throw new BadRequestException();
      }

      const accessToken = this.jwtService.sign(getPayload(userData));

      return {
        accessToken,
      };
    });
  }
}
