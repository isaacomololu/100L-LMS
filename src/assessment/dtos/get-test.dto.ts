import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class GetAssesmentDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}