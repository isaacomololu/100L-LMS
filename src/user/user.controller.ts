import { Body, Controller, Delete, Post, Query, Get } from '@nestjs/common';
import { BaseController } from 'src/common';
import { LecturerService } from './lecturer.service';
import { AssignLecturerDto, GetLecturerCoursesDto, GetCourseLecturersDto } from "./dtos";


@Controller('user')
export class UserController extends BaseController {
    constructor(private readonly lecturerService: LecturerService) {
        super();
    }

    @Post('lecturer/assign')
    async assignLecturer(@Body() form: AssignLecturerDto) {
        const assignCourse = await this.lecturerService.assignLecturer(form);
        if (assignCourse.errMessage) throw assignCourse.error;
        return this.response({
            message: 'Course Assigned',
            data: assignCourse.data,
        });
    }

    @Delete('lecturer/unassign')
    async removeLecturer(@Body() form: AssignLecturerDto) {
        const unassign = await this.lecturerService.removeLecturer(form);
        if (unassign.errMessage) throw unassign.error;
        return this.response({
            message: 'Lecturer Unassigned',
            data: unassign.data,
        });
    }

    @Get('lecturer')
    async getLecturerCourses(@Query() form: GetLecturerCoursesDto) {
        const lecturer = await this.lecturerService.getLecturerCourses(form);
        if (lecturer.errMessage) throw lecturer.error;
        return this.response({
            message: 'Lecturer Retrieved',
            data: lecturer.data,
        });
    }

    @Get('lecturer')
    async getCourseLecturers(@Query() form: GetCourseLecturersDto) {
        const course = await this.lecturerService.getCourseLecturers(form);
        if (course.errMessage) throw course.error;
        return this.response({
            message: 'Lecturer Retrieved',
            data: course.data,
        });
    }



}
