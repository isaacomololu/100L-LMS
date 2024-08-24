import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateAssignmentDto {
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
    totalMarks: string;

    @IsDate()
    @IsNotEmpty()
    dueDate: Date;
}