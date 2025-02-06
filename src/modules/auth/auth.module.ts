import { UserModule } from '@modules/user/user.module';
import { Global, Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';

@Global()
@Module({
  imports: [UserModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService, UserModule], //TODO: add UserModule for test import into other modules
})
export class AuthModule {}
