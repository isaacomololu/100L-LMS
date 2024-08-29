import { IsNotEmpty, IsString } from "class-validator";

export class StudentSigninDto {
    @IsString()
    @IsNotEmpty()
    matricNo: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}