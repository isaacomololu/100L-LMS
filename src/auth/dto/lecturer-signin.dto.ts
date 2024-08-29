import { IsNotEmpty, IsString } from "class-validator";

export class LecturerSigninDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}