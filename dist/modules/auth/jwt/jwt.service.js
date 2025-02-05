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
exports.JwtService = void 0;
const user_service_1 = require("../../user/user.service");
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const jwt = require("jsonwebtoken");
const PRIVATE_KEY = process.env.JWT_SECRET;
let JwtService = class JwtService {
    constructor(userService) {
        this.userService = userService;
    }
    async generateToken(data) {
        return await jwt.sign(data, PRIVATE_KEY, { algorithm: 'HS256', expiresIn: '20h' });
    }
    async verify(token) {
        try {
            const data = (await jwt.verify(token, PRIVATE_KEY));
            const userData = await this.userService.findById(data.id);
            if (!userData) {
                throw new common_1.UnauthorizedException('Not authorized');
            }
            const expTS = data.exp * 1000;
            const nowTS = Date.now().valueOf();
            if ((0, date_fns_1.differenceInSeconds)(expTS, nowTS) < 0) {
                throw new common_1.UnauthorizedException('Token has expired');
            }
            return data;
        }
        catch (error) {
            return null;
        }
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], JwtService);
//# sourceMappingURL=jwt.service.js.map