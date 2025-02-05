"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserSchemaToResponse = validateUserSchemaToResponse;
const DEFAULT_BLOCK_PROPERTIES = ['createdAt', 'hashPassword', 'updatedAt'];
function validateUserSchemaToResponse(data, omitProperties) {
    const excludeKeys = !omitProperties ? DEFAULT_BLOCK_PROPERTIES : omitProperties;
    const objectKeys = Object.keys(data);
    const validKeys = objectKeys.filter((el) => !excludeKeys.includes(el));
    const userData = {};
    for (const key of validKeys) {
        userData[key] = data[key];
    }
    console.log(userData);
}
//# sourceMappingURL=index.js.map