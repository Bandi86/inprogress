import {
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/core/services/prisma.service';
import { CreateBookDto } from './dtos/create-book.dto'
import { UpdateBookDto } from './dtos/update-book.dto'

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  // create a book
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    try {
      // create new book using prisma client
      const newBook = await this.prisma.book.create({
        data: {
          ...createBookDto,
        },
      });

      return newBook;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // get all book
  async getAllBook(): Promise<Book[]> {
    try {
      // get all books using prisma client
      const allBooks = await this.prisma.book.findMany();

      return allBooks;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // get a book by id
  async getBookById(bookId: string): Promise<Book> {
    try {
      // get a book by id using prisma client
      const book = await this.prisma.book.findUniqueOrThrow({
        where: {
          bookId: bookId,
        },
      });

      // throw not found exception if no book found
      if (!book) {
        throw new NotFoundException('Book not found');
      }

      return book;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // update a book by id
  async updateBook(
    bookId: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    try {
      // find book by id. If not found, throw error
      const book = await this.prisma.book.findUniqueOrThrow({
        where: { bookId },
      });

      if (!book) {
        throw new NotFoundException('Book not found');
      }

      // update book by id using prisma client
      const updatedBook = await this.prisma.book.update({
        where: {
          bookId: bookId,
        },
        data: {
          ...updateBookDto,
        },
      });

      return updatedBook;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // delete a book by id
  async deleteBook(bookId: string): Promise<Book> {
    try {
      // find book by id. If not found, throw error
      const book = await this.prisma.book.findUniqueOrThrow({
        where: { bookId },
      });

      if (!book) {
        throw new NotFoundException('Book not found');
      }

      // delete book by id using prisma client
      await this.prisma.book.delete({
        where: {
          bookId: bookId,
        },
      });

      return book;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}
