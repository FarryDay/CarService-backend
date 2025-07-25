import UserUtils from '@/utils/user.utils';
import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import LoginDTO from './dto/login.dto';
import RegistrationDTO from './dto/registration.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    const token = await this.authService.registration(registrationDto);
    res.cookie('token', token);
    return {
      message: `Success registration!`,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@Req() req: any) {
    const userData = UserUtils.omit(req.user, ...UserUtils.DEFAULT_PROPERTIES);
    return userData;
  }
}
