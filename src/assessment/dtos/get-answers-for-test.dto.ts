import { IsNotEmpty, IsString } from "class-validator"

export class GetStudentAnswersForTestDto {
    @IsNotEmpty()
    @IsString()
    testId: string;

    @IsNotEmpty()
    @IsString()
    studentId: string
}