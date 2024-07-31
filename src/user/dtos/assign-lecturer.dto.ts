import { IsNotEmpty, IsString } from "class-validator";

export class AssignLecturerDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    courseCode: string;
}