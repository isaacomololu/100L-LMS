import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordResetDTO {
  @ApiProperty({ required: true })
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
