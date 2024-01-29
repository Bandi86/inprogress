import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsMineGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request)

    // 💡 We can access the user payload from the request object
    // because we assigned it in the AuthGuard
    return (request.params.userId) === request.user.sub;
  }
}