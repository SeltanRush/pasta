import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from './posts/post.entity';

const typeormConfig: TypeOrmModuleOptions = {
  entities: [UserEntity, PostEntity],
  type: 'postgres',
  host: process.env.PG_HOST,
  database: process.env.PG_NAME,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
