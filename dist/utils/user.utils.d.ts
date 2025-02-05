import { User } from '@prisma/client';
type BLOCK_PROPERTIES = (typeof DEFAULT_BLOCK_PROPERTIES)[number];
type OmitProps = undefined | (keyof User)[] | BLOCK_PROPERTIES[];
type OmitUser = Omit<User, BLOCK_PROPERTIES>;
declare const DEFAULT_BLOCK_PROPERTIES: readonly ["createdAt", "hashPassword", "updatedAt"];
export declare function omitUserSchema(data: User, omitProps?: OmitProps): OmitUser;
export {};
