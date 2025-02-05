import { IsEmail, IsString, MinLength } from 'class-validator';

export default class RegistrationDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
