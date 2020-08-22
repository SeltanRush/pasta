import { PostEntity } from 'posts/post.entity';

import { ConvertedUser, convertUser } from './convertUser';

export interface ConvertedPost {
  id: number;
  title: string;
  content: string;
  author: ConvertedUser;
}

export const convertPost = (post: PostEntity): ConvertedPost => {
  return {
    id: post.id,
    title: post.title,
    author: convertUser(post.author),
    content: post.content,
  };
};
