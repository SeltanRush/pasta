import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, IsHash } from 'class-validator';

import { PostEntity } from '../posts/post.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @Column()
  username: string;

  @IsHash('sha256')
  @IsNotEmpty()
  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    () => PostEntity,
    post => post.author,
  )
  posts: PostEntity[];
}
