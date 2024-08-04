import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Course, Enrollment, Lecture, Student } from './database/models';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { LecturerModule } from './lecturer/lecturer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    CourseModule,
    StudentModule,
    LecturerModule,
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '4220',
    //   database: 'postgres',
    //   logging: false,
    //   models: [
    //     Student,
    //     Lecture,
    //     Course,
    //     Enrollment
    //   ],
    //   autoLoadModels: true,
    //   synchronize: true,
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
