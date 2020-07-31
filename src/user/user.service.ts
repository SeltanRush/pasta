import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser({ email, password, username }: CreateUserDto) {
    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    const userInDb = await query.getOne();

    if (userInDb) {
      throw new HttpException(
        'Email and username should be unique',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    const user = new UserEntity();
    user.email = email;
    user.username = username;
    user.password = passwordHash;

    await this.userRepository.save(user);

    return {
      user,
    };
  }

  async findByEmail({ email }: { email: string }) {
    return await this.userRepository.findOne({ email });
  }

  async findById(id: UserEntity['id']) {
    return await this.userRepository.findOne(id);
  }

  async deleteUser() {
    return 'deleteUser';
  }

  async updateUser() {
    return 'updateUser';
  }
}
