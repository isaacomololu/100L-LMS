import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class GetLecturerByEmailDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}