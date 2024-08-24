import { IsOptional, IsString } from "class-validator";

export class UpdateQuestionDto {
    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    type: 'mcq' | 'theory';

    @IsOptional()
    @IsString()
    options?: { A: string; B: string; C: string; D: string };

    @IsOptional()
    @IsString()
    answer: string;

    @IsOptional()
    @IsString()
    points: string;
}