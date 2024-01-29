import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/core/services/prisma.service';
import { CreateBooksDto } from './dtos/create-books.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  // create a book
  async createBook(createBooksDto: CreateBooksDto): Promise<Book> {
    try {
      // create new book using prisma client
      const newBook = await this.prisma.book.create({
        data: {
          ...createBooksDto,
        },
      });

      return newBook;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}
