import { Body, Controller, Post, Get, Query, Patch, Delete, Put } from '@nestjs/common';
import { BaseController } from 'src/common';
import { LectureService } from './lecture.service';
import {
    CreateLectureDto,
    GetLectureByIdDto,
    GetLectureByTitleDto,
    UpdateLectureDto,
    ScheduleLectureDto
} from './dtos';
@Controller('lecture')
export class LectureController extends BaseController {
    constructor(private readonly lectureService: LectureService) {
        super();
    }

    @Post()
    async createLecture(@Body() form: CreateLectureDto) {
        const lecture = await this.lectureService.createLecture(form);
        if (lecture.isError) return lecture.error;
        return this.response({
            data: lecture.data,
            message: 'Lecture Created'
        })
    }

    @Get()
    async getLectureById(@Query() form: GetLectureByIdDto) {
        const lecture = await this.lectureService.getLectureById(form);
        if (lecture.isError) return lecture.error;
        return this.response({
            data: lecture.data,
            message: 'Lecture Retrived'
        })
    }

    @Get()
    async getLectureByTitle(@Query() form: GetLectureByTitleDto) {
        const lecture = await this.lectureService.getLectureByTitle(form);
        if (lecture.isError) return lecture.error;
        return this.response({
            data: lecture.data,
            message: 'Lecture Retrived'
        })
    }

    @Get('/lecturers')
    async getLectuer(@Query('id') id: string) {
        const lecturer = await this.lectureService.getLectuer(id);
        if (lecturer.isError) return lecturer.error;
        return this.response({
            data: lecturer.data,
            message: 'Lecturer Retrived'
        })
    }

    @Patch()
    async updateLecture(@Query('id') id: string, form: UpdateLectureDto) {
        const lecture = await this.lectureService.updateLecture(id, form);
        if (lecture.isError) return lecture.error;
        return this.response({
            data: lecture.data,
            message: 'Lecture Updated'
        })
    }

    @Delete()
    async deleteLecture(@Query('id') id: string) {
        const lecture = await this.lectureService.deleteLecture(id);
        if (lecture.isError) return lecture.error;
        return this.response({
            data: lecture.data,
            message: 'Lecture Deleted'
        })
    }

    @Put('/schedule-lecture')
    async scheduleLecture(@Query() form: ScheduleLectureDto) {
        const lecture = await this.lectureService.scheduleLecture(form);
        if (lecture.isError) return lecture.error;
        return this.response({
            data: lecture.data,
            message: 'Lecture Scheduled'
        })
    }

    @Put('/mark-as-complete')
    async markLectureAsCompleted(@Query('id') id: string) {
        const lecture = await this.lectureService.markLectureAsCompleted(id);
        if (lecture.isError) return lecture.error;
        return this.response({
            data: lecture.data,
            message: 'Lecture Completed'
        })
    }
}
