import { Controller, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { convertUser } from 'utils/converters/response/convertUser';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { user } = await this.userService.createUser(createUserDto);

    return {
      user: convertUser(user),
    };
  }
}
