import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  birthDate: Date;
  

  @IsString()
  image: string;
}

export default CreateAuthorDto;