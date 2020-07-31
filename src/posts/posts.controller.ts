import { Controller, Get, UseGuards, Req, Body, Post } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/auth.guard';

import { AddPostDto } from './add-post.dto';
import { PostsService } from './posts.service';
import { UserPayload } from 'src/utils/jwt/getPayload';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserPosts(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addPost(@Req() req: Request, @Body() addPostDto: AddPostDto) {
    const user = req.user as UserPayload;
    const post = this.postsService.addPost({ userId: user.id, addPostDto });

    return {
      post,
    };
  }
}
