import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * V1: Reads user id from X-User-Id header (dev stub).
 * Replace with a real JWT guard that validates token and sets request.user.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    if (!userId) throw new UnauthorizedException('Authentication required');
    request.user = { id: userId, sub: userId };
    return true;
  }
}
