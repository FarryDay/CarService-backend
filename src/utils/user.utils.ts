import { User } from '@prisma/client';

export const DEFAULT_USER_REMOVE_PROPERTIES = ['createdAt', 'hashPassword', 'updatedAt'] as const;

export function omitUserSchema<T extends Array<keyof User>>(obj: User, ...removals: T) {
  const removalsUntyped = removals as Array<unknown>;
  return Object.fromEntries(Object.entries(obj).filter(([key]) => !removalsUntyped.includes(key))) as Omit<
    User,
    T[number]
  >;
}
