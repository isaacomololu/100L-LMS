import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateAssignmentDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    // @IsString()
    // @IsNotEmpty()
    // startTime: string;

    // @IsString()
    // @IsNotEmpty()
    // endTime: string;

    @IsString()
    @IsOptional()
    totalMarks: string;

    @IsDate()
    @IsOptional()
    dueDate: Date;
}