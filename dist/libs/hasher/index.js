"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const saltRounds = 10;
class Hasher {
    static async hash(string) {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(string, salt);
    }
    static async compare(string, hash) {
        return await bcrypt.compare(string, hash);
    }
}
exports.default = Hasher;
//# sourceMappingURL=index.js.map