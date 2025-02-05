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
exports.AuthService = void 0;
const hasher_1 = require("../../libs/hasher");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_service_1 = require("./jwt/jwt.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const userData = await this.userService.findByEmailOrUsername(loginDto.emailOrUsername);
        if (!userData) {
            throw new common_1.BadRequestException('Incorrect name/email or password!');
        }
        const isCorrectPassword = await hasher_1.default.compare(loginDto.password, userData.hashPassword);
        if (!isCorrectPassword) {
            throw new common_1.BadRequestException('Incorrect name/email or password!');
        }
        const { hashPassword, updateAt, ...data } = userData;
        return await this.jwtService.generateToken(data);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_service_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map