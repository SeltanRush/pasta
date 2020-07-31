import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), UserModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
