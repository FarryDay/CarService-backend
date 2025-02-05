import { UserService } from '../user/user.service';
import LoginDTO from './dto/login.dto';
import { JwtService } from './jwt/jwt.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(loginDto: LoginDTO): Promise<string>;
}
