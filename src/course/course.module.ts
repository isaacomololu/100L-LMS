import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseEnrollment } from './course-enrollment.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  providers: [CourseService, CourseEnrollment, UserService],
  controllers: [CourseController]
})
export class CourseModule {}
