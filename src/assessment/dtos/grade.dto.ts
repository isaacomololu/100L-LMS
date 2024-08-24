import { IsNotEmpty, IsNumber } from "class-validator";

export class GradeAnswerDto {
    @IsNotEmpty()
    @IsNumber()
    score: number
}