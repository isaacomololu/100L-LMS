import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateTestDto {
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
    duration: string;

    @IsString()
    @IsOptional()
    totalMarks: string;
}