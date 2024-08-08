import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common';
import {
    CreateLectureDto,
    GetLectureByIdDto,
    GetLectureByTitleDto,
    UpdateLectureDto,
    ScheduleLectureDto
} from './dtos';
import { Course, Lecture, Lecturer } from 'src/database/models';

//Should only be acessible by a lecturer
@Injectable()
export class LectureService extends BaseService {
    constructor() {
        super()
    }

    async createLecture(payload: CreateLectureDto) {
        const { lecturerId, code, ...title } = payload;

        const lecturer = await Lecturer.findOne({ where: { id: lecturerId } });
        if (!lecturer)
            return this.HandleError(new NotFoundException('Lecturer not found'));

        const course = await Course.findOne({ where: { code: code } });
        if (!course)
            return this.HandleError(new NotFoundException('Course not found'));

        const lecture = await Lecture.create({
            ...title,
            lecturerId,
            code,
        });

        return this.Results(lecture);
    }

    async getLectureById(payload: GetLectureByIdDto) {
        const { id, lecturerId, code } = payload;

        const lecturer = await Lecturer.findOne({ where: { id: lecturerId } });
        if (!lecturer)
            return this.HandleError(new NotFoundException('Lecturer not found'));

        const course = await Course.findOne({ where: { code: code } });
        if (!course)
            return this.HandleError(new NotFoundException('Course not found'));

        const lecture = await Lecture.findOne({ where: { id: id } });
        if (!lecture)
            return this.HandleError(new NotFoundException('lecture not found'));

        return this.Results(lecture);
    }

    async getLectureByTitle(payload: GetLectureByTitleDto) {
        const { title, lecturerId, code } = payload;

        const lecturer = await Lecturer.findOne({ where: { id: lecturerId } });
        if (!lecturer)
            return this.HandleError(new NotFoundException('Lecturer not found'));

        const course = await Course.findOne({ where: { code: code } });
        if (!course)
            return this.HandleError(new NotFoundException('Course not found'));

        const lecture = await Lecture.findOne({ where: { title: title } });
        if (!lecture)
            return this.HandleError(new NotFoundException('lecture not found'));

        return this.Results(lecture);
    }

    async getLectuer(id: string) {
        const lecture = await Lecture.findOne({ where: { id: id } });
        if (!lecture)
            return this.HandleError(new NotFoundException('lecture not found'));
    }

    async getStudentAttendance() { }

    async updateLecture(id: string, payload: UpdateLectureDto) {
        const lecture = await Lecture.findOne({ where: { id } });
        if (!lecture)
            return this.HandleError(new NotFoundException('Lecture not found'));
        await lecture.update(payload);
        return this.Results(lecture);
    }

    async deleteLecture(id: string) {
        const lecture = await Lecture.findOne({ where: { id } });
        if (!lecture)
            return this.HandleError(new NotFoundException('Lecture not found'));
        await lecture.destroy();
        return this.Results(null);
    }

    // Learn how to upload files in nest 
    async uploadLectureMaterial(id: string, file) { }

    // Decide if this should occur at lecture creation or when the method is called
    async scheduleLecture(payload: ScheduleLectureDto) {
        const { id, date } = payload
        const lecture = await Lecture.findOne({ where: { id } });
        if (!lecture)
            return this.HandleError(new NotFoundException('Lecture not found'));
        lecture.scheduledDate = date;
        await lecture.save();
        return this.Results(lecture);
    }

    async markLectureAsCompleted(id: string) {
        const lecture = await Lecture.findOne({ where: { id } });
        if (!lecture)
            return this.HandleError(new NotFoundException('Lecture not found'));
        lecture.isCompleted = true;
        await lecture.save();
        return this.Results(lecture);
    }
}
