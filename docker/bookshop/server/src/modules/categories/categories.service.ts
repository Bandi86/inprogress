import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // create a category
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      // create new category using prisma client
      const newCategory = await this.prisma.category.create({
        data: {
          ...createCategoryDto,
        },
      });

      return newCategory;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // get all categories
  async getAllCategories(): Promise<Category[]> {
    try {
      // get all categories using prisma client
      const categories = await this.prisma.category.findMany();

      return categories;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // get category by id
  async getCategoryById(categoryId: string): Promise<Category> {
    try {
      // get category by id using prisma client
      const category = await this.prisma.category.findUnique({
        where: {
          categoryId,
        },
      });

      return category;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // update category
  async updateCategory(
    categoryId: string,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      // update category using prisma client
      const updatedCategory = await this.prisma.category.update({
        where: {
          categoryId,
        },
        data: {
          ...updateCategoryDto,
        },
      });

      return updatedCategory;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // delete category
  async deleteCategory(categoryId: string): Promise<Category> {
    try {
      // delete category using prisma client
      const deletedCategory = await this.prisma.category.delete({
        where: {
          categoryId,
        },
      });

      return deletedCategory;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}
