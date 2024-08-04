import { Module } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { LecturerController } from './lecturer.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [LecturerService, JwtService],
  controllers: [LecturerController]
})
export class LecturerModule { }
