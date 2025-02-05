"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const hasher_1 = require("../../libs/hasher");
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { password, ...props } = data;
        const hashPassword = await hasher_1.default.hash(password);
        const user = await this.prisma.user
            .create({
            data: {
                ...props,
                hashPassword,
            },
        })
            .catch(() => {
            throw new common_1.BadRequestException('Ошибка создания пользователя!');
        });
        return user;
    }
    async findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async findByEmailOrUsername(emailOrName) {
        return this.prisma.user.findFirst({
            where: {
                OR: [{ email: emailOrName }, { username: emailOrName }],
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map