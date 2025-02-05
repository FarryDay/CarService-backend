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
exports.AuthGuard = void 0;
const user_utils_1 = require("../../../utils/user.utils");
const user_service_1 = require("../../user/user.service");
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../jwt/jwt.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async canActivate(context) {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest();
        const res = httpContext.getResponse();
        const token = req.cookies.token || '';
        const data = await this.jwtService.verify(token);
        if (!data) {
            res.clearCookie('token');
            throw new common_1.UnauthorizedException();
        }
        const userData = await this.userService.findById(data.id);
        const iatTS = data.iat * 1000;
        const userUpdatedTS = userData.updatedAt.valueOf();
        if (userUpdatedTS > iatTS) {
            const data = (0, user_utils_1.omitUserSchema)(userData);
            const newToken = await this.jwtService.generateToken(data);
            res.cookie('token', newToken);
        }
        req.user = userData;
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService,
        user_service_1.UserService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map