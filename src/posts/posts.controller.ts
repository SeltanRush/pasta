import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserPosts(@Req() req: Request) {
    return req.user;
  }
}
