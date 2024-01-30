import { IsNotEmpty, IsString, IsUUID, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsDateString()
  publishedAt: string;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;

  @IsNumber()
  numberOfPages: number;

  @IsString()
  publisher: string;
}

export default CreateBookDto;

