import { UserEntity } from 'user/user.entity';

export interface ConvertedUser {
  id: number;
  username: string;
  email: string;
}

export const convertUser = (user: UserEntity): ConvertedUser => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
};
