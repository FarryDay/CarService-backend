import { Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard)
  @Query(() => User)
  async get() {
    //@Context() context: any
    // const user = context.req.user;
    return { exampleField: 10 };
  }
}
