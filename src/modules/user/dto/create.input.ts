import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

export class CreateDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
