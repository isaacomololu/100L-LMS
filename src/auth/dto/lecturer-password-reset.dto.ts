import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class LecturerPasswordResetDTO {
    @Transform(({ value }) => value.toLowerCase())
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsStrongPassword()
    @IsString()
    password: string;
}
