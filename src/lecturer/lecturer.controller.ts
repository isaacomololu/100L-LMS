import { Controller, Post, Delete, Get, Body, Query } from '@nestjs/common';
import { BaseController } from 'src/common';
import { LecturerService } from './lecturer.service';
import { AssignLecturerDto, GetLecturerCoursesDto, GetCourseLecturersDto, SignupDto, SigninDto, GetLecturerByIdDto } from './dtos';

@Controller('lecturer')
export class LecturerController extends BaseController {
    constructor(private readonly lecturerService: LecturerService) {
        super();
    }


    @Post('signup')
    async signUp(@Body() form: SignupDto) {
        const lecturer = await this.lecturerService.signup(form);
        if (lecturer.errMessage) throw lecturer.error;
        return this.response({
            message: 'lecturer Created Succesfully',
            data: lecturer.data,
        });
    }

    @Post('signin')
    async signIn(@Body() form: SigninDto) {
        const lecturer = await this.lecturerService.signin(form);
        if (lecturer.errMessage) throw lecturer.error;
        return this.response({
            message: 'lecturer Signed-in Succesfully',
            data: lecturer.data,
        });
    }

    @Get('')
    async getLecturerById(@Query() form: GetLecturerByIdDto) {
        const lecturer = await this.lecturerService.getLecturerById(form);
        if (lecturer.errMessage) throw lecturer.error;
        return this.response({
            message: 'lecturer Retrived',
            data: lecturer.data,
        });
    }

    @Post('/assign')
    async assignLecturer(@Body() form: AssignLecturerDto) {
        const assignCourse = await this.lecturerService.assignLecturer(form);
        if (assignCourse.errMessage) throw assignCourse.error;
        return this.response({
            message: 'Course Assigned',
            data: assignCourse.data,
        });
    }

    @Post('/unassign')
    async removeLecturer(@Body() form: AssignLecturerDto) {
        const unassign = await this.lecturerService.unassignLecturer(form);
        if (unassign.errMessage) throw unassign.error;
        return this.response({
            message: 'Lecturer Unassigned',
            data: unassign.data,
        });
    }

    // @Get('lecturer')
    // async getLecturerCourses(@Query() form: GetLecturerCoursesDto) {
    //     const lecturer = await this.lecturerService.getLecturerCourses(form);
    //     if (lecturer.errMessage) throw lecturer.error;
    //     return this.response({
    //         message: 'Lecturer Retrieved',
    //         data: lecturer.data,
    //     });
    // }

    @Get('/course-lecturers')
    async getCourseLecturers(@Query() form: GetCourseLecturersDto) {
        const course = await this.lecturerService.getCourseLecturers(form);
        if (course.errMessage) throw course.error;
        return this.response({
            message: 'Lecturer Retrieved',
            data: course.data,
        });
    }
}
