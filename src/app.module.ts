import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({ entities: [UserEntity] }), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
