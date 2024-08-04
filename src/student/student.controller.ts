import { Controller, Post, Body, Patch, Req, Param, Delete, Query } from '@nestjs/common';
import { BaseController } from 'src/common';
import { StudentService } from './student.service';
import {
    GetStudentDto,
    UpdateStudentProfileDto,
    ChangePasswordDto,
    EnrollStudentDto,
} from './dtos';

@Controller('student')
export class StudentController extends BaseController {
    constructor(private readonly studentService: StudentService) {
        super();
    }

    @Post()
    async getStudentByMatric(@Body() form: GetStudentDto) {
        const student = await this.studentService.getStudentByMatric(form);
        if (student.error) return student.errMessage;
        return this.response({
            message: 'Student Retrive',
            data: student.data,
        });
    }

    @Patch()//might need to collect matricNo as param
    async updateStudentProfile(@Body() form: UpdateStudentProfileDto) {
        const student = await this.studentService.updateStudentProfile(form);
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
            message: 'Student enrolled',
            data: student.data,
        });
    }

    @Delete('/enroll')
    async unenroll(@Body() form: EnrollStudentDto) {
        const student = await this.studentService.unenroll(form);
        if (student.error) return student.errMessage;
        return this.response({
            message: 'Student unenrolled',
            data: student.data,
        });
    }


}