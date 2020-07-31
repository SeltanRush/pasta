import { IsNotEmpty, IsString } from 'class-validator';

export class AddPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
