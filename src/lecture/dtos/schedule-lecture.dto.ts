import { IsUUID, IsString, IsDate, IsNotEmpty } from "class-validator";

export class ScheduleLectureDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID('4')
    id: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;
}