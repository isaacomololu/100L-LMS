import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class SubmitAnswerDto {
    @IsString()
    @IsNotEmpty()
    content: string;
}