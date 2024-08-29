import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class SubmitAnswerDto {
    @IsString()
    @IsNotEmpty()
    questionId: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}