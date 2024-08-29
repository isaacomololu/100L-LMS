import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LecturerPasswordResetDTO {
    @Transform(({ value }) => value.toLowerCase())
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    id: string;
}
