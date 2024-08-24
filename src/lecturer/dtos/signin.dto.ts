import { IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}