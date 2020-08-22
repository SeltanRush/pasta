import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { UserEntity } from 'user/user.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  title: string;

  @IsNotEmpty()
  @Column()
  content: string;

  @ManyToOne(
    () => UserEntity,
    user => user,
  )
  @IsNotEmpty()
  author: UserEntity;

  @Column({ default: true })
  isActive: boolean;
}
