import { DEFAULT_USER_REMOVE_PROPERTIES, omitUserSchema } from '@/utils/user.utils';
import { UserService } from '@modules/user/user.service';
import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import LoginDTO from './dto/login.dto';
import RegistrationDTO from './dto/registration.dto';
import { AuthGuard } from './guards/auth.guard';
import { JwtService } from './jwt/jwt.service';

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(@Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDTO) {
    const token = await this.authService.login(loginDto);

    res.cookie('token', token);
    return {
      message: `Success authorization!`,
    };
  }

  @Post('/registration')
  async registration(@Res({ passthrough: true }) res: Response, @Body() registrationDto: RegistrationDTO) {
    const data = await this.userService.create(registrationDto);
    const token = await this.jwtService.generateToken(data);

    res.cookie('token', token);
    return {
      message: `Success registration!`,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@Req() req: any) {
    const userData = omitUserSchema(req.user, ...DEFAULT_USER_REMOVE_PROPERTIES);
    return userData;
  }
}
