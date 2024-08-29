import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUUID, IsEmail } from 'class-validator';

export class StudentSignupDto {
  @IsString()
  @IsNotEmpty()
  matricNo: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  otherName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CourseDTO)
  // courses: CourseDTO[];
}
