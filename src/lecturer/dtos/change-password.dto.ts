import { IsNotEmpty, IsString } from "class-validator";

export class changePasswordDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}