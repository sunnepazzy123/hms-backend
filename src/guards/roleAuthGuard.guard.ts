import { CanActivate, ExecutionContext } from '@nestjs/common';
import { roleType } from 'src/constants/enums';
import { IRequest } from 'src/interface/request.interface';

export class RoleAuthGuard implements CanActivate {
  constructor(private readonly role: roleType) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<IRequest>();
    const { role } = request.user || {};
    if (role === this.role) return true;
    return false;
  }
}
