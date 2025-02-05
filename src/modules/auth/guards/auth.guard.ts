import { omitUserSchema } from '@/utils/user.utils';
import { UserService } from '@modules/user/user.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const res = httpContext.getResponse() as Response;
    const token = req.cookies.token || '';

    const data = await this.jwtService.verify(token);
    if (!data) {
      res.clearCookie('token');
      throw new UnauthorizedException();
    }

    const userData = await this.userService.findById(data.id);

    const iatTS = data.iat * 1000;
    const userUpdatedTS = userData.updatedAt.valueOf();
    if (userUpdatedTS > iatTS) {
      const data = omitUserSchema(userData);
      const newToken = await this.jwtService.generateToken(data);
      res.cookie('token', newToken);
    }

    req.user = userData;
    return true;
  }
}
