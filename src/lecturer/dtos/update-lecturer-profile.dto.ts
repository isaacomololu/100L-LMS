import { IsEnum, IsNotEmpty, IsString, IsUUID, IsEmail, IsOptional } from 'class-validator';

export class UpdateLecturerProfileDto {
    @IsString()
    @IsUUID('4')
    @IsNotEmpty()
    id: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    otherName: string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    avatar: string;
}