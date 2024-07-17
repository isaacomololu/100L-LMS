import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    unit: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}