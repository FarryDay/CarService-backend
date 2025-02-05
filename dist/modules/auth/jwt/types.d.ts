import { User } from '@prisma/client';
export type VerifiedData = null | (User & {
    iat: number;
    exp: number;
});
