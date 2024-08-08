import { IsNotEmpty, IsString } from "class-validator";

export class GetLectureByIdDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    lecturerId: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}