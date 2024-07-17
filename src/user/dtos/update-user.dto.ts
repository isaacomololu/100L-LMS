import { IsEnum, IsNotEmpty, IsString, IsUUID, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserProfileDto {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  matricNo: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;


  @IsString()
  @IsOptional()
  avatar: string;
}