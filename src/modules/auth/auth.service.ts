import Hasher from '@/libs/hasher';
import UserUtils from '@/utils/user.utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { UserService } from '../user/user.service';
import LoginDTO from './dto/login.dto';
import RegistrationDTO from './dto/registration.dto';
import { JwtService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
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

    const data = UserUtils.omit(userData, ...UserUtils.DEFAULT_PROPERTIES);

    return await this.jwtService.generateToken(data);
  }

  async registration(registrationDto: RegistrationDTO): Promise<string> {
    const userData = await this.userService.create(registrationDto, { emailConfirm: true });

    this.emailService.sendEmail(userData.email, {
      subject: 'Регистрация!',
      template: this.emailService.templates.RegistrationEmail({ username: userData.username }),
    });

    const data = UserUtils.omit(userData, ...UserUtils.DEFAULT_PROPERTIES);
    return this.jwtService.generateToken(data);
  }
}
