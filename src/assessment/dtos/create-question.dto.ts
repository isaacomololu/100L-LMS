import { IsNotEmpty, IsOptional, IsString, IsObject } from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    type: 'mcq' | 'theory';

    @IsOptional()
    @IsObject()
    options?: { A: string; B: string; C: string; D: string };

    @IsOptional()
    @IsString()
    answer: string;

    @IsNotEmpty()
    @IsString()
    points: string;
}