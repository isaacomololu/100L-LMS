import { Controller, Post, Body, Patch, Req, Param, Delete, Query, Get } from '@nestjs/common';
import { BaseController } from 'src/common';
import { StudentService } from './student.service';
import {
    GetStudentDto,
    UpdateStudentProfileDto,
    ChangePasswordDto,
    EnrollStudentDto,
    BulkEnrollStudentDto,
} from './dtos';

@Controller('student')
export class StudentController extends BaseController {
    constructor(private readonly studentService: StudentService) {
        super();
    }

    @Get()
    async getStudentByMatric(@Body() form: GetStudentDto) {
        const student = await this.studentService.getStudentByMatric(form);
        if (student.error) return student.errMessage;
        return this.response({
            message: 'Student Retrive',
            data: student.data,
        });
    }

    @Patch()//might need to collect matricNo as param
    async updateStudentProfile(@Query('matricNo') matricNo: string, @Body() form: UpdateStudentProfileDto) {
        const student = await this.studentService.updateStudentProfile(matricNo, form);
        if (student.error) return student.errMessage;
        return this.response({
            message: 'Student update',
            data: student.data,
        });
    }

    @Patch('update-password')//figure out how the request thing works
    async updatePassword(@Query('matricNo') matricNo: string, @Body() form: ChangePasswordDto) {
        const updatePassword = await this.studentService.updatePassword(matricNo, form);
        if (updatePassword.isError) throw updatePassword.error;
        return this.response({
            message: 'Password Updated',
            data: updatePassword.data
        });
    }

    @Delete()
    async dropStudent(@Query('matricNo') matricNo: string) {
        const student = await this.studentService.dropStudent(matricNo);
        if (student.error) return student.errMessage;
        return this.response({
            message: 'Student deleted',
            data: student.data,
        });
    }

    @Post('/enroll')
    async enrollStudent(@Body() form: EnrollStudentDto) {
        const student = await this.studentService.enrollStudent(form);
        if (student.error) return student.errMessage;
        return this.response({
            message: 'Student enrolled for course',
            data: student.data,
        });
    }

    @Delete('/unenroll')
    async unenroll(@Body() form: EnrollStudentDto) {
        const student = await this.studentService.unenroll(form);
        if (student.error) return student.errMessage;
        return this.response({
            message: 'Student unenrolled from course',
            data: student.data,
        });
    }

    @Patch('/renroll')
    async renrollStudent(@Body() form: EnrollStudentDto) {
        const renroll = await this.studentService.renrollStudent(form);
        if (renroll.isError) throw renroll.error;
        return this.response({
            message: 'You have renrolled for this course',
            data: renroll.data
        });
    }

    @Get('/student-courses')
    async studentCourses(@Query('matricNo') matricNo: string) {
        const courses = await this.studentService.getStudentCourses(matricNo);
        if (courses.isError) throw courses.error;
        return this.response({
            message: 'Courses retrived',
            data: courses.data
        });
    }

    @Get('/students')
    async enrolledStudents(@Query('code') code: string) {
        const students = await this.studentService.getEnrolledStudents(code);
        if (students.isError) throw students.error;
        return this.response({
            message: 'Students retrived',
            data: students.data
        });
    }

    @Get('/status')
    async enrollmentStatus(@Query() form: EnrollStudentDto) {
        const status = await this.studentService.getEnrollmentStatus(form);
        if (status.isError) throw status.error;
        return this.response({
            message: 'Status retrived',
            data: status.data
        });
    }

    @Post('/bulk-enroll')
    async bulkEnroll(@Body() form: BulkEnrollStudentDto) {
        const enrolled = await this.studentService.bulkEnroll(form);
        if (enrolled.isError) throw enrolled.error;
        return this.response({
            message: 'Enrolled for course',
            data: enrolled.data
        });
    }
}