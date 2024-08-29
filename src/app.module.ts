import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from './database/database.module';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { LecturerModule } from './lecturer/lecturer.module';
import { LectureModule } from './lecture/lecture.module';
import { AssessmentModule } from './assessment/assessment.module';
import { PassportModule } from '@nestjs/passport';
import config from './database/database.config';
import {
  Answer,
  Assignment,
  Course,
  Enrollment,
  Lecture,
  Lecturer,
  Question,
  Student,
  Test
} from './database/models';
import { CourseLecturer } from './database/models/course-lecturer.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      ...config,
      models: [
        Student,
        Lecturer,
        Course,
        Lecture,
        Test,
        Assignment,
        Question,
        Answer,
        Enrollment,
      ]
    }),
    // DatabaseModule,
    AuthModule,
    CourseModule,
    StudentModule,
    LecturerModule,
    LectureModule,
    AssessmentModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }