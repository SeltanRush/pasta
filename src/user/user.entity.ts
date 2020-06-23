import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsNotEmpty, IsHash } from 'class-validator';

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
}
