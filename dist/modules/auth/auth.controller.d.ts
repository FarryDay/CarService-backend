import { UserService } from '@modules/user/user.service';
import { Response } from 'express';
import { AuthService } from './auth.service';
import LoginDTO from './dto/login.dto';
import RegistrationDTO from './dto/registration.dto';
import { JwtService } from './jwt/jwt.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly jwtService;
    constructor(authService: AuthService, userService: UserService, jwtService: JwtService);
    login(res: Response, loginDto: LoginDTO): Promise<{
        message: string;
    }>;
    registration(res: Response, registrationDto: RegistrationDTO): Promise<{
        message: string;
    }>;
    me(req: any): Promise<{
        id: number;
        username: string;
        email: string;
    }>;
}
