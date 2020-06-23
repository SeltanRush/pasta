import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async createUser(): Promise<void> {
    console.log('createUser');
  }

  async findUser(): Promise<void> {
    console.log('findUser');
  }

  async deleteUser(): Promise<void> {
    console.log('deleteUser');
  }

  async updateUser(): Promise<void> {
    console.log('updateUser');
  }
}
