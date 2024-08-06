import { IsNotEmpty, IsString } from "class-validator";

export class BulkEnrollStudentDto {
    @IsString()
    @IsNotEmpty()
    matricNos: string[];

    @IsString()
    @IsNotEmpty()
    code: string;
}