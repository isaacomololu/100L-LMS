import { IsNotEmpty, IsString } from "class-validator";

export class SigninDto {
    @IsString()
    @IsNotEmpty()
    matricNo: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}