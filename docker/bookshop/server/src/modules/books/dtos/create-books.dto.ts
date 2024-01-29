import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,  
} from 'class-validator';

export class CreateBooksDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly authorId: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly image: string;

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  readonly isbn: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsDate()
  @IsNotEmpty()
  readonly publishedAt: Date;
}
