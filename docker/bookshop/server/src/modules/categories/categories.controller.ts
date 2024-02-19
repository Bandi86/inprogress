import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Categorys } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExpressRequestWithUser } from '../users/interfaces/express-request-with-user.interface';
import { Public } from 'src/common/decorators/public.decorator';
import { IsMineGuard } from '../../common/guards/is-mine.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // create a category
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Request() req: ExpressRequestWithUser,
  ): Promise<Categorys> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  // get all categories
  @Public()
  @Get()
  async getAllCategories(): Promise<Categorys[]> {
    return this.categoriesService.getAllCategories();
  }

  // get category by id
  @Public()
  @Get(':categoryId')
  async getCategoryById(categoryId: string): Promise<Categorys> {
    const category = await this.categoriesService.getCategoryById(categoryId);
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    return category;
  }

  // update category
  @Patch(':categoryId')
  @UseGuards(IsMineGuard)
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Categorys> {
    const category = await this.categoriesService.updateCategory(
      categoryId,
      createCategoryDto,
    );
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    return category;
  }

  // delete category
  @Delete(':categoryId')
  @UseGuards(IsMineGuard)
  async deleteCategory(
    @Param('categoryId')
    categoryId: string,
  ): Promise<Categorys> {
    const category = await this.categoriesService.deleteCategory(categoryId);
    if (!category) {
      throw new HttpException('Category not found', 404);
    }
    return category;
  }
}
