import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    type: 'mcq' | 'theory';

    @IsOptional()
    @IsString()
    options?: { A: string; B: string; C: string; D: string };

    @IsOptional()
    @IsString()
    answer: string;

    @IsNotEmpty()
    @IsString()
    points: string;
}