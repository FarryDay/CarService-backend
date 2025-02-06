import Hasher from '@/libs/hasher';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { EmailService } from '../email/email.service';
import { CreateDTO } from './dto/create.input';
import { UserCreateOptions, UserFindByIdOptions } from './types';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(data: CreateDTO, options?: UserCreateOptions): Promise<User> {
    const { password, ...props } = data;
    const hashPassword = await Hasher.hash(password);

    const user = await this.prisma.user
      .create({
        data: {
          ...props,
          hashPassword,
        },
      })
      .catch(() => {
        throw new BadRequestException('Ошибка создания пользователя!');
      });

    if (options?.emailConfirm) {
      await this.emailService.createEmailConfirm(user.id);
    }

    return user;
  }

  async findById(id: number, options?: UserFindByIdOptions): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: options?.includes || {},
      omit: options?.omit || {},
    });
  }

  async findByEmailOrUsername(emailOrName: string, options?: UserFindByIdOptions): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrName }, { username: emailOrName }],
      },
      include: options?.includes || {},
      omit: options?.omit || {},
    });
  }
}
