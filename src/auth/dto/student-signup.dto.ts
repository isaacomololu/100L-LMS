import { Matches, IsNotEmpty, IsString, IsUUID, IsEmail } from 'class-validator';

export class StudentSignupDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}\/\d{2}\/\d{4}$/, {
    message: 'matricNo must be in the format DDD/YY/NNNN (e.g., SEN/18/7839)'
  })
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
