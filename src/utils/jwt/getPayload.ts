import { UserEntity } from 'src/user/user.entity';

export const getPayload = (user: UserEntity) => {
  return { id: user.id, username: user.username };
};
