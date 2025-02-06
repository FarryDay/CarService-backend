import { Prisma } from '@prisma/client';

export type UserFindByIdOptions = {
  includes?: Prisma.UserInclude;
  omit?: Prisma.UserOmit;
};

export type UserCreateOptions = {
  emailConfirm: boolean;
};
