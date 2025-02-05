import { User } from '@prisma/client';
import { OmitProps } from './types';
export declare function validateUserSchemaToResponse(data: User, omitProperties?: OmitProps): void;
