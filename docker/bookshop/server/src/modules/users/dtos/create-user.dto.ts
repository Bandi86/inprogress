import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}