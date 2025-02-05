import { User } from '@prisma/client';
type BLOCK_PROPERTIES = (typeof DEFAULT_BLOCK_PROPERTIES)[number];
type OmitProps = undefined | (keyof User)[];
type OmitUser = Omit<User, BLOCK_PROPERTIES>;
declare const DEFAULT_BLOCK_PROPERTIES: readonly ["createdAt", "hashPassword", "updatedAt"];
export declare function omitUserSchema(data: User, omitProperties?: OmitProps): OmitUser;
export {};
