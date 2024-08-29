import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { BaseService } from 'src/common';
import { Lecturer, Course } from 'src/database/models';
import {
    UpdateLecturerProfileDto,
    changePasswordDto,
    AssignLecturerDto,
    GetCourseLecturersDto,
    SignupDto,
    SigninDto,
    GetLecturerByIdDto,
    GetLecturerByEmailDto,
} from './dtos';

@Injectable()
export class LecturerService extends BaseService {
    constructor() {
        super();
    }

    async getLecturerById(payload: GetLecturerByIdDto) {
        const { id } = payload;
        const lecturer = await Lecturer.findOne({ where: { id } });
        if (!lecturer)
            return this.HandleError(
                new NotFoundException('lecturer not found'),
            );
        return this.Results(lecturer);
    }

    async getLecturerByEmail(payload: GetLecturerByEmailDto) {
        const { email } = payload
        const lecturer = await Lecturer.findOne({ where: { email } });
        if (!lecturer)
            return this.HandleError(
                new NotFoundException('User not found'),
            );
        return this.Results(lecturer);
    }

    async updateLecturerProfile(
        {
            id,
            email,
            firstName,
            otherName,
            phone,
            avatar
        }: UpdateLecturerProfileDto
    ) {
        const getLecturer = await this.getLecturerById({ id });

        if (getLecturer.isError || !getLecturer.data) return getLecturer;

        const lecturer = getLecturer.data;

        const updatePayload: any = {
            ...(email ? { email } : {}),
            ...(firstName ? { firstName } : {}),
            ...(otherName ? { otherName } : {}),
            ...(phone ? { phone } : {}),
            ...(avatar ? { avatar } : {}),
        };

        await lecturer.update(updatePayload);
    }

    async updatePassword({ newPassword, password }: changePasswordDto, id: string) {
        const getLecturer = await this.getLecturerById({ id });

        if (getLecturer.isError || !getLecturer.data) return getLecturer;

        const lecturer = getLecturer.data;

        if (!lecturer.validatePassword(password))
            return this.HandleError(new BadRequestException('Password is incorrect'));

        await lecturer.update({ password: newPassword });

        return this.Results(lecturer);
    }

    async assignLecturer(payload: AssignLecturerDto) {
        const { id, code } = payload;
        const lecturer = await Lecturer.findOne({
            where: { id: id }
        });
        if (!lecturer.id)
            return this.HandleError(new NotFoundException('Lecturer does not exist'));
        if (lecturer.code !== null)
            return this.HandleError(new BadRequestException('Lecturer has already be assigned a course'));

        const course = await Course.findByPk(code);
        if (!course)
            return this.HandleError(new NotFoundException('Course does not exist'));

        lecturer.code = code;
        await lecturer.save();

        return this.Results(lecturer);
    }

    async unassignLecturer(payload: AssignLecturerDto) {
        const { id, code } = payload;
        const lecturer = await Lecturer.findOne({
            where: { id: id, code: code }
        });
        if (!lecturer)
            return this.HandleError(new NotFoundException('Lecturer is not assigned to this course'));

        lecturer.code = null;
        await lecturer.save();
        await lecturer.reload();

        return this.Results(lecturer);
    }

    async getCourseLecturers(payload: GetCourseLecturersDto) {
        const { code } = payload;
        const course = await Course.findByPk(code);
        if (!course) {
            return this.HandleError(new NotFoundException('Course not found'));
        }

        const lecturers = course.lecturers;
        return this.Results(lecturers);
    }

    async getLecturers() {
        const lecturers = await Lecturer.findAll();
        return this.Results(lecturers);
    }

    // Seems unnecessary after user split
    // async getLecturerCourses(payload: AssignLecturerDto) {
    //     const { id, code } = payload;
    //     const lecturer = await Lecturer.findOne({
    //         where: { id: id, code: code },
    //     });

    //     if (!lecturer)
    //         return this.HandleError(new NotFoundException('Lecturer not found'));

    //     console.log(lecturer.);
    //     return this.Results(lecturer);
    // }
}
