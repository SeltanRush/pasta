import {
  Controller,
  Get,
  UseGuards,
  Req,
  Body,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from 'auth/auth.guard';
import { UserPayload } from 'utils/jwt/getPayload';

import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { convertPost } from 'utils/converters/response/convertPost';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserPosts(@Req() req: Request) {
    const user = req.user as UserPayload;
    const posts = await this.postsService.findUserPosts({ userId: user.id });

    return {
      posts: posts.map(convertPost),
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPost(@Param('id') id: string) {
    const { post } = await this.postsService.findPost({ postId: Number(id) });
    return {
      post: convertPost(post),
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createPost(@Req() req: Request, @Body() createPostDto: CreatePostDto) {
    const user = req.user as UserPayload;
    const { post } = await this.postsService.createPost({
      userId: user.id,
      createPostDto,
    });

    return {
      post: convertPost(post),
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as UserPayload;
    await this.postsService.deletePost({
      userId: user.id,
      postId: Number(id),
    });

    return true;
  }
}
