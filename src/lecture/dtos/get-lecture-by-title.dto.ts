import { IsNotEmpty, IsString } from "class-validator";

export class GetLectureByTitleDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    lecturerId: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}