import { IsNotEmpty, IsString, IsDate, IsOptional, IsUrl, IsUUID } from "class-validator";

export class CreateLectureDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsDate()
    scheduledDate?: Date;

    @IsOptional()
    @IsUrl()
    materialUrl?: string;

    @IsOptional()
    @IsUrl()
    videoUrl?: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    lecturerId: string;

    @IsNotEmpty()
    @IsString()
    code: string;
}

// @IsUUID('4')
//   @IsNotEmpty()
//   @IsString()
//   title: string;

//   @IsOptional()
//   @IsString()
//   description?: string;

//   @IsOptional()
//   @IsDate()
//   scheduledDate?: Date;

//   @IsOptional()
//   @IsBoolean()
//   isCompleted?: boolean;

//   @IsOptional()
//   @IsUrl()
//   materialUrl?: string;

//   @IsOptional()
//   @IsUrl()
//   videoUrl?: string;

//   @IsNotEmpty()
//   @IsString()
//   code: string;

//   @IsNotEmpty()
//   @IsUUID('4')
//   lecturerId: string;