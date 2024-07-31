import { IsNotEmpty, IsString } from "class-validator";

export class GetCourseLecturersDto {
    @IsString()
    @IsNotEmpty()
    code: string;
}