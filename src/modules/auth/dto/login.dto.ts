import { IsString, MinLength } from 'class-validator';

export default class LoginDTO {
  @IsString()
  @MinLength(6)
  emailOrUsername: string;

  @IsString()
  @MinLength(8)
  password: string;
}
