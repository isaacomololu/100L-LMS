import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class BulkassignLectures {
    @IsString()
    @IsArray()
    @IsNotEmpty()
    ids: string[];

    @IsString()
    @IsNotEmpty()
    code: string;
}