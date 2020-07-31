import { genSalt, hash } from 'bcrypt';

export const getPasswordHash = async (password: string) => {
  const salt = await genSalt(10);
  const passwordHash = await hash(password, salt);
  return passwordHash;
};
