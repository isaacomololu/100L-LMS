import { IsNotEmpty, IsString } from "class-validator";

export class GetStudentDto {
    @IsString()
    @IsNotEmpty()
    matricNo: string;
}