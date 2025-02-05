import Hasher from '@/libs/hasher';
import { omitUserSchema } from '@/utils/user.utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import LoginDTO from './dto/login.dto';
import { JwtService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO): Promise<string> {
    const userData = await this.userService.findByEmailOrUsername(loginDto.emailOrUsername);
    if (!userData) {
      throw new BadRequestException('Incorrect name/email or password!');
    }

    const isCorrectPassword = await Hasher.compare(loginDto.password, userData.hashPassword);
    if (!isCorrectPassword) {
      throw new BadRequestException('Incorrect name/email or password!');
    }

    const data = omitUserSchema(userData);

    return await this.jwtService.generateToken(data);
  }
}
