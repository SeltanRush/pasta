import { Controller, Get, UseGuards, Req, Body, Post } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from 'src/auth/auth.guard';

import { CreatePostDto } from './create-post.dto';
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
  @Post('create')
  async createPost(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const user = req.user as UserPayload;
    const post = this.postsService.createPost({
      userId: user.id,
      createPostDto,
    });

    return {
      post,
    };
  }
}
