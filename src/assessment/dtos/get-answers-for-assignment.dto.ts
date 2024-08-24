import { IsNotEmpty, IsString } from "class-validator"

export class GetStudentAnswersForAssignmentsDto {
    @IsNotEmpty()
    @IsString()
    assignmentId: string;

    @IsNotEmpty()
    @IsString()
    studentId: string
}