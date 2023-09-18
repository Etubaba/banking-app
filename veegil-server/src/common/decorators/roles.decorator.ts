// import { SetMetadata } from '@nestjs/common';
import { Role } from '../role.enum';
import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'role';
export const Roles = (...role: Role[]) => SetMetadata(ROLES_KEY, role);

// export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
