import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RolesGuard
  implements CanActivate
{
  constructor(
    private role: string,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request =
      context.switchToHttp().getRequest();

    return request.user.role === this.role;
  }
}