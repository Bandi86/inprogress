import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { CreateUsersDto } from './dtos/create-user.dto';
import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginUsersDto } from './dtos/login-user.dto';
import { LoginResponse, UserPayload } from './interfaces/users-login.interface';
import { UpdateUsersDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Find all users
  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  // Find one user
  async findOne(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    // remove password from response
    delete user.password;

    return user;
  }

  // Create a user
  async registerUser(createUsersDto: CreateUsersDto): Promise<User> {
    try {
      // create new user using prisma client
      const newUser = await this.prisma.user.create({
        data: {
          email: createUsersDto.email,
          password: await hash(createUsersDto.password, 10), // hash user's password
          username: createUsersDto.username,
        },
      });
      

      // remove password from response
      delete newUser.password;

      return newUser;
    } catch (error) {
      // check if email already registered and throw error
      if (error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // Login a user
  async loginUser(loginUsersDto: LoginUsersDto): Promise<LoginResponse> {
    try {
      // find user by email
      const user = await this.prisma.user.findUnique({
        where: { email: loginUsersDto.email },
      });

      // check if user exists
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // check if password is correct by comparing it with the hashed password in the database
      if (!(await compare(loginUsersDto.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: UserPayload = {
        // create payload for JWT
        sub: user.userId, // sub is short for subject. It is the user id
        email: user.email,
        name: user.username,
      };

      return {
        // return access token
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);      
    }
  }

  // Update a user
  async updateUser(
    userId: string,
    updateUsersDto: UpdateUsersDto,
  ): Promise<User> {
    try {
      // find user by id. If not found, throw error
      await this.prisma.user.findUniqueOrThrow({
        where: { userId },
      });

      // update user using prisma client
      const updatedUser = await this.prisma.user.update({
        where: { userId },
        data: {
          ...updateUsersDto,
          // if password is provided, hash it
          ...(updateUsersDto.password && {
            password: await hash(updateUsersDto.password, 10),
          }),
        },
      });

      // remove password from response
      delete updatedUser.password;

      return updatedUser;
    } catch (error) {
      // check if user not found and throw error
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      // check if email already registered and throw error
      if (error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // Delete a user
  async deleteUser(userId: string): Promise<string> {
    try {
      // find user by userId. If not found, throw error
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { userId },
      });

      // delete user using prisma client
      await this.prisma.user.delete({
        where: { userId },
      });

      return `User with userId ${user.userId} deleted`;
    } catch (error) {
      // check if user not found and throw error
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with userId ${userId} not found`);
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}
