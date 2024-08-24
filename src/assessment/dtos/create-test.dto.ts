import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateTestDto {
    @IsString()
    @IsNotEmpty()
    lecturerId: string;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    // @IsString()
    // @IsNotEmpty()
    // startTime: string;

    // @IsString()
    // @IsNotEmpty()
    // endTime: string;

    @IsString()
    @IsNotEmpty()
    duration: string;

    @IsString()
    @IsNotEmpty()
    totalMarks: string;
}