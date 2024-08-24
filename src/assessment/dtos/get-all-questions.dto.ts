import { IsNotEmpty, IsString } from "class-validator";

export class GetAllQuestionsDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}