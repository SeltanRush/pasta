import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}
