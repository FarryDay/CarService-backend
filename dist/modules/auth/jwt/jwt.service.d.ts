import { UserService } from '@modules/user/user.service';
import { VerifiedData } from './types';
export declare class JwtService {
    private readonly userService;
    constructor(userService: UserService);
    generateToken(data: Record<string, any>): Promise<string>;
    verify(token: string): Promise<null | VerifiedData>;
}
