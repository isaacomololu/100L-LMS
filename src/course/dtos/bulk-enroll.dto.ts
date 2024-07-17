import { IsNotEmpty, IsString } from "class-validator";

export class bulkEnrollDto {
    @IsString()
    @IsNotEmpty()
    matricNos: string[];

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}