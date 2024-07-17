import { IsNotEmpty, IsString } from "class-validator";

export class GetCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}