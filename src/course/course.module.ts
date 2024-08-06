import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
// import { CourseEnrollment } from './course-enrollment.service';
import { StudentService } from 'src/student/student.service';

@Module({
  imports: [],
  providers: [CourseService, StudentService],
  controllers: [CourseController]
})
export class CourseModule { }
