import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { BaseController } from 'src/common';
import { CourseService } from './course.service';
import { CreateCourseDto, EnrollmentDto, GetCourseDto, UpdateCourseDto, bulkEnrollDto } from './dtos';
import { CourseEnrollment } from './course-enrollment.service';

@Controller('course')
export class CourseController extends BaseController {
    constructor(
        private readonly courseService: CourseService,
        private readonly courseEnrollment: CourseEnrollment,
    ) {
        super();
    }

    @Get('')
    async allCourses() {
        const courses = await this.courseService.getAllCourses();
        if (courses.isError) throw courses.error;
        return this.response({
            message: 'Courses retirvied',
            data: courses.data
        });
    }

    @Get('/specific') //get better route
    async getcourse(@Query() form: GetCourseDto) {
        const course = await this.courseService.getCourse(form);
        if (course.isError) throw course.error;
        return this.response({
            message: 'Course retirvied',
            data: course.data
        });
    }

    @Post('/create-course')
    async createCourse(@Body() form: CreateCourseDto) {
        const course = await this.courseService.createCourse(form);
        if (course.isError) throw course.error;
        return this.response({
            message: 'Course Created',
            data: course.data
        });
    }

    @Patch('/update-course')
    async updateCourse(@Body() form: UpdateCourseDto) {
        const course = await this.courseService.updateCourse(form);
        if (course.isError) throw course.error;
        return this.response({
            message: 'Course updated',
            data: course.data
        });
    }

    @Delete() //make this only for Allowed users
    async deleteCourse(@Body() form: GetCourseDto) {
        const course = await this.courseService.deleteCourse(form);
        if (course.isError) throw course.error;
        return this.response({
            message: 'Course deleted',
            data: course.data
        });
    }

    @Post('/enroll')
    async enrollStudent(@Body() form: EnrollmentDto) {
        const enrolled = await this.courseEnrollment.enrollStudent(form);
        if (enrolled.isError) throw enrolled.error;
        return this.response({
            message: 'Enrolled for course',
            data: enrolled.data
        });
    }

    @Patch('/unenroll')
    async unenrollStudent(@Body() form: EnrollmentDto) {
        const unenroll = await this.courseEnrollment.unenrollStudent(form);
        if (unenroll.isError) throw unenroll.error;
        return this.response({
            message: 'Course has been dropped',
            data: unenroll.data
        });
    }

    @Patch('/renroll')
    async renrollStudent(@Body() form: EnrollmentDto) {
        const renroll = await this.courseEnrollment.renrollStudent(form);
        if (renroll.isError) throw renroll.error;
        return this.response({
            message: 'You have renrolled for this course',
            data: renroll.data
        });
    }

    @Get('/student-courses')
    async studentCourses(@Query('matricNo') matricNo: string) {
        const courses = await this.courseEnrollment.getStudentCourses(matricNo);
        if (courses.isError) throw courses.error;
        return this.response({
            message: 'Courses retrived',
            data: courses.data
        });
    }

    @Get('/students')
    async enrolledStudents(@Query('code') code: string) {
        const students = await this.courseEnrollment.getEnrolledStudents(code);
        if (students.isError) throw students.error;
        return this.response({
            message: 'Courses retrived',
            data: students.data
        });
    }

    @Get('/status')
    async enrollmentStatus(@Query() form: EnrollmentDto) {
        const status = await this.courseEnrollment.getEnrollmentStatus(form);
        if (status.isError) throw status.error;
        return this.response({
            message: 'Courses retrived',
            data: status.data
        });
    }

    @Post('/bulk-enroll')
    async bulkEnroll(@Body() form: bulkEnrollDto) {
        const enrolled = await this.courseEnrollment.bulkEnroll(form);
        if (enrolled.isError) throw enrolled.error;
        return this.response({
            message: 'Enrolled for course',
            data: enrolled.data
        });
    }



}
