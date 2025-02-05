import { UserService } from '@modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { differenceInSeconds } from 'date-fns';
import * as jwt from 'jsonwebtoken';
import { VerifiedData } from './types';

const PRIVATE_KEY = process.env.JWT_SECRET;

@Injectable()
export class JwtService {
  constructor(private readonly userService: UserService) {}

  async generateToken(data: Record<string, any>): Promise<string> {
    return await jwt.sign(data, PRIVATE_KEY, { algorithm: 'HS256', expiresIn: '20h' });
  }

  async verify(token: string): Promise<null | VerifiedData> {
    try {
      const data = (await jwt.verify(token, PRIVATE_KEY)) as User & { iat: number; exp: number };

      const userData = await this.userService.findById(data.id);
      if (!userData) {
        throw new UnauthorizedException('Not authorized');
      }

      const expTS = data.exp * 1000;
      const nowTS = Date.now().valueOf();
      if (differenceInSeconds(expTS, nowTS) < 0) {
        throw new UnauthorizedException('Token has expired');
      }

      return data;
    } catch (error) {
      return null;
    }
  }
}
