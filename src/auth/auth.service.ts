import { ConflictException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import AuthCredentialsDto from './dto/auth-credentials-dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signin(username, pass) {
    const user = await this.usersService.findOne(username);]
    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      this.usersService.create(username, hashedPassword);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
