import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get('public_api', context.getHandler());
    
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}

export const Public = () => SetMetadata('public_api', true);
