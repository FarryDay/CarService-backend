import { User } from '@prisma/client';

type BLOCK_PROPERTIES = (typeof DEFAULT_BLOCK_PROPERTIES)[number];
type OmitProps = undefined | (keyof User)[] | BLOCK_PROPERTIES[];
type OmitUser = Omit<User, BLOCK_PROPERTIES>;

const DEFAULT_BLOCK_PROPERTIES = ['createdAt', 'hashPassword', 'updatedAt'] as const;

export function omitUserSchema(data: User, omitProps?: OmitProps): OmitUser {
  const excludeKeys = !omitProps ? DEFAULT_BLOCK_PROPERTIES : omitProps;
  const objectKeys = Object.keys(data);
  const validKeys = objectKeys.filter((el) => !excludeKeys.includes(el as BLOCK_PROPERTIES));

  const userData = {};
  for (const key of validKeys) {
    userData[key] = data[key];
  }

  return userData as OmitUser;
}
