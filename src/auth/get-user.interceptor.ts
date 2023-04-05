import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

export class GetUserInterceptor implements NestInterceptor {
  constructor(
    @Inject(UserService)
    private readonly usersService: UserService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const user = await this.usersService.findOne(request.user.username);
    // only keep id and username in user object
    request.user = { id: user.id, username: user.username };
    return next.handle().pipe();
  }
}
