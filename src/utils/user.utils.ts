import { User } from '@prisma/client';

export default class UserUtils {
  public static DEFAULT_PROPERTIES: Array<keyof User> = ['createdAt', 'hashPassword', 'updatedAt', 'role'] as const;
  public static omit(obj: User, ...removals: Array<keyof User>) {
    const removalsUntyped = removals as Array<unknown>;
    return Object.fromEntries(Object.entries(obj).filter(([key]) => !removalsUntyped.includes(key))) as Omit<
      User,
      Array<keyof User>[number]
    >;
  }
}
