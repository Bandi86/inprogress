import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/services/prisma.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Categorys } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // create a category
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Categorys> {
    try {
      // create new category using prisma client
      const newCategory = await this.prisma.categorys.create({
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
  async getAllCategories(): Promise<Categorys[]> {
    try {
      // get all categories using prisma client
      const categories = await this.prisma.categorys.findMany();

      return categories;
    } catch (error) {
      // throw error if any
      throw new HttpException(error, 500);
    }
  }

  // get category by id
  async getCategoryById(categoryId: string): Promise<Categorys> {
    try {
      // get category by id using prisma client
      const category = await this.prisma.categorys.findUnique({
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
  ): Promise<Categorys> {
    try {
      // update category using prisma client
      const updatedCategory = await this.prisma.categorys.update({
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
  async deleteCategory(categoryId: string): Promise<Categorys> {
    try {
      // delete category using prisma client
      const deletedCategory = await this.prisma.categorys.delete({
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
