"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitUserSchema = omitUserSchema;
const DEFAULT_BLOCK_PROPERTIES = ['createdAt', 'hashPassword', 'updatedAt'];
function omitUserSchema(data, omitProperties) {
    const excludeKeys = !omitProperties ? DEFAULT_BLOCK_PROPERTIES : omitProperties;
    const objectKeys = Object.keys(data);
    const validKeys = objectKeys.filter((el) => !excludeKeys.includes(el));
    const userData = {};
    for (const key of validKeys) {
        userData[key] = data[key];
    }
    return userData;
}
//# sourceMappingURL=user.utils.js.map