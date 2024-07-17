import { IsOptional, IsString } from "class-validator";

export class UpdateCourseDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    code: string;

    @IsString()
    @IsOptional()
    unit: string;

    @IsString()
    @IsOptional()
    description: string;
}