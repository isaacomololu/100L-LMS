import { IsNotEmpty, IsString } from "class-validator";

export class GetLecturerByIdDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}