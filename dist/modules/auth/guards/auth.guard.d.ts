import { UserService } from '@modules/user/user.service';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
