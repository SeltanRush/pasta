import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { AddPostDto } from './add-post.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    private userService: UserService,
  ) {}

  async addPost({
    userId,
    addPostDto,
  }: {
    userId: UserEntity['id'];
    addPostDto: AddPostDto;
  }) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new InternalServerErrorException();
    }

    const post = new PostEntity();
    post.author = user;
    post.title = addPostDto.title;
    post.content = addPostDto.content;

    await this.postsRepository.save(post);

    return {
      post,
    };
  }
}
