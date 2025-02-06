import GuardsUtils from '@/utils/guards.utils';
import UserUtils from '@/utils/user.utils';
import { UserService } from '@modules/user/user.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = GuardsUtils.getRequest(context);
    const res = GuardsUtils.getResponse(context);

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
      const data = UserUtils.omit(userData, ...UserUtils.DEFAULT_PROPERTIES);
      const newToken = await this.jwtService.generateToken(data);
      res.cookie('token', newToken);
    }

    req.user = userData;
    return true;
  }
}
