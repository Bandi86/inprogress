import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
import { CreateBooksDto } from './dtos/create-books.dto'
import { ExpressRequestWithUser } from '../users/interfaces/express-request-with-user.interface'
import { Book } from '@prisma/client'
import { Public } from 'src/common/decorators/public.decorator';
import { IsMineGuard } from '../users/users.controller'
import { UpdateBooksDto } from './dtos/update-books.dto'
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    // create a book
    @Post()
  async createPost(
    @Body() createBooksDto: CreateBooksDto,
    @Request() req: ExpressRequestWithUser,
  ): Promise<Book> {    
    return this.booksService.createBooks(createBooksDto);
  }

  // get all books
  @Public()
  @Get()
  getAllPosts(): Promise<Book[]> {
    return this.booksService.getAllPosts();
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
      @Body() updateBooksDto: UpdateBooksDto,
    ): Promise<Book> {
      return this.booksService.updateBooks(bookId, updateBooksDto);
    }

    // delete a book by id
    @Delete(':bookId')
    @UseGuards(IsMineGuard)
    async deletePost(@Param('bookId') bookId: string): Promise<Book> {
      return this.booksService.deleteBooks(bookId);
    }
  }    