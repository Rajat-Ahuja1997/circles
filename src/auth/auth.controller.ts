import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from 'src/auth/dto/sign-in-dto';
import AuthCredentialsDto from 'src/auth/dto/auth-credentials-dto';
import { Public } from 'src/is-public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Public()
  signin(@Body() signInDto: SignInDto) {
    const { username, password } = signInDto;

    return this.authService.signin(username, password);
  }

  @Post('/signup')
  @Public()
  signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.createUser(authCredentialsDto);
  }
}
