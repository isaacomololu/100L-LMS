import { IsNotEmpty, IsString } from "class-validator";

export class AssignLecturerDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    code: string;
}