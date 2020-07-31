import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

import { PostEntity } from './post.entity';
import { CreatePostDto } from './create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    private userService: UserService,
  ) {}

  async createPost({
    userId,
    createPostDto,
  }: {
    userId: UserEntity['id'];
    createPostDto: CreatePostDto;
  }) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new InternalServerErrorException();
    }

    const post = new PostEntity();
    post.author = user;
    post.title = createPostDto.title;
    post.content = createPostDto.content;

    await this.postsRepository.save(post);

    return {
      post,
    };
  }
}
