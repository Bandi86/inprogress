import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import CreateAuthorDto from './dtos/create-author.dto';
import { Authors } from '@prisma/client';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  // create a author
  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Authors> {
    try {
      const newAuthor = await this.prisma.authors.create({
        data: {
          ...createAuthorDto,
        },
      });

      return newAuthor;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // get all author
  async getAllAuthor(): Promise<Authors[]> {
    try {
      const allAuthors = await this.prisma.authors.findMany();
      return allAuthors;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // get a author by id
  async getAuthorById(authorId: string): Promise<Authors> {
    try {
      const author = await this.prisma.authors.findUniqueOrThrow({
        where: {
          authorId: authorId,
        },
      });

      // throw not found exception if no author found
      if (!author) {
        throw new NotFoundException('Author not found');
      }

      return author;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // update a author
  async updateAuthor(
    authorId: string,
    updateAuthorDto: CreateAuthorDto,
  ): Promise<Authors> {
    try {
      const updatedAuthor = await this.prisma.authors.update({
        where: {
          authorId: authorId,
        },
        data: {
          ...updateAuthorDto,
        },
      });

      return updatedAuthor;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // delete a author
  async deleteAuthor(authorId: string): Promise<Authors> {
    try {
      const deletedAuthor = await this.prisma.authors.delete({
        where: {
          authorId: authorId,
        },
      });

      return deletedAuthor;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}
