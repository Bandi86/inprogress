import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  user: any;
  constructor(private readonly databaseService: DatabaseService) {}

  // Create a new user
  @HttpCode(201)
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // check if user already exists
    const user = await this.databaseService.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const { password } = data;
    const hashedPassword = await hash(password, 10);
    data.password = hashedPassword;
    return this.databaseService.user.create({
      data,
    });
  }

  // Find all users
  async findAll(role?: 'ADMIN' | 'USER') {
    if (role) return this.databaseService.user.findMany({ where: { role } });
    return this.databaseService.user.findMany();
  }

  // Find one user
  async findOne(userId: string) {
    return this.databaseService.user.findUnique({ where: { userId } });
  }

  // Update a user
  @HttpCode(200)
  async update(userId: string, updateUserDto: Prisma.UserUpdateInput) {
    // check if user already exists
    const user = await this.databaseService.user.findUnique({
      where: { userId: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // only can update username email nothing else for now
    if (updateUserDto.password || updateUserDto.role) {
      throw new HttpException(
        'Role update not allowed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { username, email } = updateUserDto;
    const updatedData: Prisma.UserUpdateInput = { username, email };

    const updatedUser = await this.databaseService.user.update({
      where: { userId: userId },
      data: updatedData,
    });

    if (updatedUser) {
      return { message: 'User updated successfully', user: updatedUser };
    } else {
      throw new HttpException('User not updated', HttpStatus.BAD_REQUEST);
    }
  }

  // Remove a user
  @HttpCode(200)
  async remove(userId: string) {
    // check if user already exists
    const user = await this.databaseService.user.findUnique({
      where: { userId: userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const deleted = this.databaseService.user.delete({
      where: { userId: userId },
    });
    if (deleted) {
      return { message: 'User deleted successfully' };
    } else {
      throw new HttpException('User not deleted', HttpStatus.BAD_REQUEST);
    }
  }
}
