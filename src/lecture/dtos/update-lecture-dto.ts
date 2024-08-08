import { IsNotEmpty, IsOptional, IsString, IsDate, IsUrl, IsUUID } from "class-validator";

export class UpdateLectureDto {
    @IsOptional()
    @IsString()
    @IsUUID('4')
    lecturerId: string;

    @IsOptional()
    @IsString()
    code: string;

    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDate()
    scheduledDate?: Date;

    @IsOptional()
    @IsUrl()
    materialUrl?: string;

    @IsOptional()
    @IsUrl()
    videoUrl?: string;
}