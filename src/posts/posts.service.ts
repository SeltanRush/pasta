import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'user/user.entity';
import { UserService } from 'user/user.service';

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

  async findUserPosts({ userId }: { userId: number }) {
    const posts = await this.postsRepository.find({
      where: {
        author: {
          id: userId,
        },
        isActive: true,
      },
      relations: ['author'],
    });

    if (!posts) {
      throw new NotFoundException({
        message: 'Not found any posts for current user',
      });
    }

    return posts;
  }

  async deletePost({ postId, userId }: { userId: number; postId: number }) {
    const post = await this.postsRepository.findOne({
      where: {
        author: {
          id: userId,
        },
        id: postId,
      },
    });

    if (!post) {
      return new NotFoundException('Couldn`t find post by id and user id');
    }

    await this.postsRepository.update(
      {
        id: postId,
        author: {
          id: userId,
        },
      },
      { isActive: false },
    );
  }
}
