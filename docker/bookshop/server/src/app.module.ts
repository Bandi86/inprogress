import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './authentication/jwt-auth.guard';
import { AuthenticationService } from './authentication/authentication.service';
import { UsersService } from './users/users.service';
import { DatabaseService } from './database/database.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    DatabaseService,
    JwtService,
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
