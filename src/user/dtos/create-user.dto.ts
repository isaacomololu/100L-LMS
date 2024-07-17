import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUUID, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  matricNo: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(['student', 'lecturer', 'admin'])
  @IsNotEmpty()
  type: 'student' | 'lecturer' | 'admin';

  @IsString()
  @IsNotEmpty()
  avatar: string;

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CourseDTO)
  // courses: CourseDTO[];
}
