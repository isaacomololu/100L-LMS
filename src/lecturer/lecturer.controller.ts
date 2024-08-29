import { Controller, Post, Delete, Get, Body, Query } from '@nestjs/common';
import { BaseController } from 'src/common';
import { LecturerService } from './lecturer.service';
import {
    AssignLecturerDto,
    GetCourseLecturersDto,
    SignupDto,
    SigninDto,
    GetLecturerByIdDto,
    GetLecturerByEmailDto
} from './dtos';

@Controller('lecturer')
export class LecturerController extends BaseController {
    constructor(private readonly lecturerService: LecturerService) {
        super();
    }

    @Get('/id')
    async getLecturerById(@Query() form: GetLecturerByIdDto) {
        const lecturer = await this.lecturerService.getLecturerById(form);
        if (lecturer.errMessage) throw lecturer.error;
        return this.response({
            message: 'Lecturer Retrived',
            data: lecturer.data,
        });
    }

    @Get()
    async getLecturers() {
        const lecturers = await this.lecturerService.getLecturers();
        if (lecturers.errMessage) throw lecturers.error;
        return this.response({
            message: 'Lecturers Retrived',
            data: lecturers.data,
        });
    }

    @Get('/email')
    async getLecturerByEmail(@Query() form: GetLecturerByEmailDto) {
        const lecturer = await this.lecturerService.getLecturerByEmail(form);
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
