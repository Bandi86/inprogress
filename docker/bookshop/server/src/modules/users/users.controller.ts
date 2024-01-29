import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUsersDto } from './dtos/create-user.dto';
import { LoginUsersDto } from './dtos/login-user.dto';
import { UpdateUsersDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { LoginResponse, UserPayload } from './interfaces/users-login.interface';
import { ExpressRequestWithUser } from './interfaces/express-request-with-user.interface';
import { Public } from 'src/common/decorators/public.decorator';
import { IsMineGuard } from 'src/common/guards/is-mine.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // get all user in db
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // get one user in db
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return `Get User ${userId}!`;
  }

  // create one user in db
  @Public()
  @Post('register')
  async registerUser(@Body() createUsersDto: CreateUsersDto): Promise<User> {
    // call users service method to register new user
    return this.usersService.registerUser(createUsersDto);
  }

  // login one user in db@Post('login')
  @Public()
  @Post('login')
  loginUser(@Body() loginUsersDto: LoginUsersDto): Promise<LoginResponse> {
    // call users service method to login user
    return this.usersService.loginUser(loginUsersDto);
  }

  // update one user in db
  @Patch(':userId')
  @UseGuards(IsMineGuard)
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ): Promise<User> {
    // call users service method to update user
    return this.usersService.updateUser(userId, updateUsersDto);
  }

  // delete one user in db
  @Delete(':userId')
  @UseGuards(IsMineGuard)
  async deleteUser(@Param('userId') userId: string): Promise<string> {
    // call users service method to delete user
    return this.usersService.deleteUser(userId);
  }

  // user profile
  @Get('profile/:userId')
  profile(@Request() req: ExpressRequestWithUser): UserPayload {
    return req.user;
  }
}
