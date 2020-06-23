import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async createUser() {
    return 'createUser';
  }

  async findUser() {
    return 'findUser';
  }

  async deleteUser() {
    return 'deleteUser';
  }

  async updateUser() {
    return 'updateUser';
  }
}
