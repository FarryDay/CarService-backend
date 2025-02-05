"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const app_module_1 = require("./app.module");
(0, date_fns_1.setDefaultOptions)({ locale: locale_1.ru });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use(cookieParser());
    app.setGlobalPrefix('/api/');
    await app.listen(3001);
}
bootstrap().then();
//# sourceMappingURL=main.js.map