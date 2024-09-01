import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class StudentPasswordResetDTO {
  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  matricNo: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  password: string;

  // @IsNotEmpty()
  // @IsString()
  // token: string;
}
