import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LecturerService } from './lecturer.service';

@Module({
  providers: [UserService, LecturerService],
  controllers: [UserController]
})
export class UserModule { }
