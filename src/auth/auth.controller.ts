import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseController } from 'src/common';
import { StudentSigninDto, LecturerSigninDto, StudentSignupDto, LecturerSignupDto, LecturerPasswordResetDTO, StudentPasswordResetDTO } from './dto';

@Controller('auth')
export class AuthController extends BaseController {
    constructor(private readonly authService: AuthService) {
        super();
    }

    @Post('lecturer-signup')
    async lecturerSignup(@Body() form: LecturerSignupDto) {
        const lecturer = await this.authService.lecturerSignup(form);
        if (lecturer.errMessage) throw lecturer.error;
        return this.response({
            message: 'Lecturer Created Succesfully',
            data: lecturer.data,
        });
    }

    @Post('student-signup')
    async studentSignup(@Body() form: StudentSignupDto) {
        const student = await this.authService.studentSignup(form);
        if (student.errMessage) throw student.error;
        return this.response({
            message: 'Student Created Succesfully',
            data: student.data,
        });
    }

    @Post('lecturer-signin')
    async lecturerSignin(@Body() form: LecturerSigninDto) {
        const lecturer = await this.authService.lecturerSignin(form);
        if (lecturer.errMessage) throw lecturer.error;
        return this.response({
            message: 'Lecturer Signed-in Succesfully',
            data: lecturer.data,
        });
    }

    @Post('student-signin')
    async studentSignin(@Body() form: StudentSigninDto) {
        const student = await this.authService.studentSignin(form);
        if (student.errMessage) throw student.error;
        return this.response({
            message: 'Student Signed-in Succesfully',
            data: student.data,
        });
    }

    @Patch('lecturer-reset')
    async initiateLecturerPasswordReset(@Body() form: LecturerPasswordResetDTO) {
        const lecturer = await this.authService.initiateLecturerPasswordReset(form);
        if (lecturer.errMessage) throw lecturer.error;
        return this.response({
            message: 'Password Updated',
            data: lecturer.data,
        });
    }

    @Patch('student-reset')
    async initiateStudentPasswordReset(@Body() form: StudentPasswordResetDTO) {
        const student = await this.authService.initiateStudentPasswordReset(form);
        if (student.errMessage) throw student.error;
        return this.response({
            message: 'Password Updated',
            data: student.data,
        });
    }
}
