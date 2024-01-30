import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { ExpressRequestWithUser } from '../users/interfaces/express-request-with-user.interface';
import { Book } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';
import { IsMineGuard } from 'src/common/guards/is-mine.guard';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BookService) {}

  // create a book
  @Post()
  async createPost(
    @Body() createBookDto: CreateBookDto,
    @Request() req: ExpressRequestWithUser,
  ): Promise<Book> {
    
    return this.booksService.createBook(createBookDto);
  }

  // get all books
  @Public()
  @Get()
  // implement query params
  getAllBook(
    @Query() query: { authorId: string; categoryId: string }
  ): Promise<Book[]> {
    const { authorId, categoryId } = query
    if (query) {
      if (authorId) {
        return this.booksService.getAllBookByAuthor(authorId);
      }
      if (categoryId) {
        return this.booksService.getAllBookByCategory(categoryId);
      }
    }
    return this.booksService.getAllBook();
  }

  // get a book by id
  @Public()
  @Get(':bookId')
  getBookById(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.getBookById(bookId);
  }

  // update a book by id
  @Patch(':bookId')
  @UseGuards(IsMineGuard)
  async updatePost(
    @Param('bookId') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(bookId, updateBookDto);
  }

  // delete a book by id
  @Delete(':bookId')
  @UseGuards(IsMineGuard)
  async deletePost(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.deleteBook(bookId);
  }
}
