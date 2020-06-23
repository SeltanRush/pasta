import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser({ email, password, username }: CreateUserDto) {
    const query = this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :usename', { username })
      .orWhere('user.email = :email', { email });

    const userInDb = await query.getOne();

    if (userInDb) {
      throw new HttpException(
        'Email and username should be unique',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new UserEntity();
    user.email = email;
    user.username = username;

    return 'userCreate';
  }

  async findUserById(id: string) {
    return 'findUser';
  }

  async deleteUser() {
    return 'deleteUser';
  }

  async updateUser() {
    return 'updateUser';
  }
}
