import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CoreModule } from 'src/core/core.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { BookModule } from './modules/books/books.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { AuthorModule } from './modules/authors/authors.module'

@Module({
  imports: [
    UsersModule,
    BookModule,
    CoreModule,
    CategoriesModule,
    AuthorModule,
    // add jwt module
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
