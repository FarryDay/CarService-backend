import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateDTO } from './dto/create.input';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateDTO): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmailOrUsername(emailOrName: string): Promise<User | null>;
}
