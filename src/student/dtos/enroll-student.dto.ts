import { IsNotEmpty, IsString } from "class-validator";

export class EnrollStudentDto {
    @IsString()
    @IsNotEmpty()
    matricNo: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}