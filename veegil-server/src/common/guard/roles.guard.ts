import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import config from '../../../configs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.replace('Bearer ', '');

    try {
      const payload = this.jwtService.verify(token, {
        secret: config().jwt.access.secret,
      });
      const { role: userRoles } = payload;
      return requiredRoles.some((role) => userRoles?.includes(role));
    } catch (err) {
      return false;
    }
  }
}
