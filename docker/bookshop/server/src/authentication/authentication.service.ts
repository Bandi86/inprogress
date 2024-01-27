import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // validate a user's credentials
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const hashedPassword = await compare(password, user.password);
    if (user && hashedPassword) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // logout a user from the system and remove the JWT cookie from the user
  async logout() {
    // remove jwt from cookie

    return {
      message: 'Logged out successfully',
    };
  }
}
