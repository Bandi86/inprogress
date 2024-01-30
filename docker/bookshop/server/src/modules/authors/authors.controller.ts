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

import CreateAuthorDto from './dtos/create-author.dto';
import { AuthorService } from './authors.service';
import { ExpressRequestWithUser } from '../users/interfaces/express-request-with-user.interface';
import { Author } from '@prisma/client';
import UpdateAuthorDto from './dtos/update-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  // create a author
  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
    @Request() req: ExpressRequestWithUser,
  ): Promise<Author> {
    return this.authorService.createAuthor(createAuthorDto);
  }

  // get all authors
  @Get()
  getAllAuthors(): Promise<Author[]> {
    return this.authorService.getAllAuthor();
  }

  // get a author by id
  @Get(':authorId')
  getAuthorById(@Param('authorId') authorId: string): Promise<Author> {
    return this.authorService.getAuthorById(authorId);
  }

  // update a author by id
  // something went wrong here with the updateAuthorDto name and the updateAuthor function
  /*  @Patch(':authorId')
    async updateAuthor(
        @Param('authorId') authorId: string,
        @Body() updateAuthorDto: UpdateAuthorDto,
    ): Promise<Author> {
        return this.authorService.updateAuthor(authorId, updateAuthorDto);
    } */

  @Delete(':authorId')
  async deleteAuthor(@Param('authorId') authorId: string): Promise<Author> {
    return this.authorService.deleteAuthor(authorId);
  }
}
