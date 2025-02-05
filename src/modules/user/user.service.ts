import Hasher from '@/libs/hasher';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateDTO } from './dto/create.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDTO): Promise<User> {
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
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmailOrUsername(emailOrName: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrName }, { username: emailOrName }],
      },
    });
  }
}
