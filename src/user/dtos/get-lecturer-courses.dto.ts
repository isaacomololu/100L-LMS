import { IsNotEmpty, IsString } from "class-validator";

export class GetLecturerCoursesDto {
    @IsString()
    @IsNotEmpty()
    lecturerId: string;
}