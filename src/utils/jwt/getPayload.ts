import { UserEntity } from 'src/user/user.entity';

export interface UserPayload {
  id: number;
  username: string;
}

export const getPayload = (user: UserEntity): UserPayload => {
  return { id: user.id, username: user.username };
};
