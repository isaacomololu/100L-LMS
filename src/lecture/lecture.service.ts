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

    async updateLecture(id: string, {
        lecturerId,
        code,
        title,
        description,
        scheduledDate,
        materialUrl,
        videoUrl
    }: UpdateLectureDto
    ) {
        const lecture = await Lecture.findOne({ where: { id } });
        if (!lecture)
            return this.HandleError(new NotFoundException('Lecture not found'));
        const updatePayload: any = {
            ...(lecturerId ? { lecturerId } : {}),
            ...(code ? { code } : {}),
            ...(title ? { title } : {}),
            ...(description ? { description } : {}),
            ...(scheduledDate ? { scheduledDate } : {}),
            ...(materialUrl ? { materialUrl } : {}),
            ...(videoUrl ? { videoUrl } : {}),
        };
        await lecture.update(updatePayload);
        return this.Results(lecture);
    }

    async deleteLecture(id: string) {
        const lecture = await Lecture.findOne({ where: { id } });
        if (!lecture)
            return this.HandleError(new NotFoundException('Lecture not found'));
        await lecture.destroy();
        return this.Results(null);
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

    //Unnesccesary if retriving the lecture shows us the lecturer
    // async getLectuer(id: string) {
    //     const lecture = await Lecture.findOne({ where: { id: id } });
    //     if (!lecture)
    //         return this.HandleError(new NotFoundException('lecture not found'));
    //     const lecturerId = lecture.lecturerId;

    // }

    async getStudentAttendance() { }



    // Learn how to upload files in nest 
    async uploadLectureMaterial(id: string, file) { }

    // Decide if this should occur at lecture creation or when the method is called
    async rescheduleLecture(payload: ScheduleLectureDto) {
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
