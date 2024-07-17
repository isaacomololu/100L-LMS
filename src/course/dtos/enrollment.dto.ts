import { IsNotEmpty, IsString } from "class-validator";

export class EnrollmentDto {
    @IsString()
    @IsNotEmpty()
    matricNo: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}