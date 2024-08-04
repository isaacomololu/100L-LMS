import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class BulkassignLecturesDto {
    @IsString()
    @IsArray()
    @IsNotEmpty()
    ids: string[];

    @IsString()
    @IsNotEmpty()
    code: string;
}