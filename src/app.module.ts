import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Course, Enrollment, Lecture, CourseLecturer, User } from './database/models';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '4220',
      database: 'postgres',
      logging: false,
      models: [
        User,
        Lecture,
        Course,
        CourseLecturer,
        Enrollment
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    CourseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
