import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "src/common";
import { AssignLecturerDto, GetLecturerCoursesDto, GetCourseLecturersDto, BulkassignLectures } from "./dtos";
import { Course, CourseLecturer, User } from "src/database/models";

@Injectable()
export class LecturerService extends BaseService {
    constructor() {
        super();
    }

    async assignLecturer(payload: AssignLecturerDto) {
        const { userId, courseCode } = payload;
        const lecturer = await User.findOne({
            where: { id: userId, type: 'lecturer' }
        });
        if (!lecturer)
            return this.HandleError(new NotFoundException('Lecturer does not exist'));

        const course = await Course.findOne({ where: { code: courseCode } });
        if (!course)
            return this.HandleError(new NotFoundException('Course does not exist'));

        const existingAssignment = await CourseLecturer.findOne({
            where: { lecturerId: userId, courseCode: course.code }
        });
        if (existingAssignment)
            return this.HandleError(new BadRequestException('This course has already been assigned'));

        const assignCourse = await CourseLecturer.create({
            lecturerId: userId,
            courseCode: course.code
        });

        await lecturer.reload({
            include: [{
                model: Course,
                as: 'AssignedCourses',
                through: { attributes: [] }
            }]
        });
        console.log(lecturer);

        return this.Results(assignCourse);
    }

    async removeLecturer(payload: AssignLecturerDto) {
        const { userId, courseCode } = payload;
        const assignment = await CourseLecturer.findOne({
            where: { lecturerId: userId, courseCode: courseCode }
        });
        if (!assignment)
            return this.HandleError(new NotFoundException('Lecturer is not assigned to this course'));

        const unassign = await assignment.destroy();

        return this.Results(unassign);
    }

    async getLecturerCourses(payload: GetLecturerCoursesDto) {
        const { lecturerId } = payload;
        const lecturer = await User.findOne({
            where: { id: lecturerId, type: 'lecturer' },
            include: [{
                model: Course,
                as: 'AssignedCourses',
                through: { attributes: [] }
            }]
        });

        if (!lecturer)
            return this.HandleError(new NotFoundException('Lecturer not found'));

        console.log(lecturer.AssignedCourses);
        return this.Results(lecturer);
    }

    async getCourseLecturers(payload: GetCourseLecturersDto) {
        const { code } = payload;
        const course = await Course.findOne({
            where: { id: code },
            include: [{
                model: User,
                where: { type: 'lecturer' },
                as: 'lecturers',
                through: { attributes: [] }
            }]
        });

        if (!course) {
            return this.HandleError(new NotFoundException('Course not found'));
        }
        console.log(course.lecturers);
        // return course.lecturers;
        return this.Results(course.lecturers)
    }

    // async bulkassignLectures(payload: BulkassignLectures) {
    //     const { ids, code } = payload;

    //     const lecturers: any[] = await User.findAll({ where: { type: 'lecturer' } });
    //     if (!lecturers)
    //         return this.HandleError(new NotFoundException('Lecturers not found'));

    //     const course = await Course.findOne({ where: { code: code } });
    //     if (!course)
    //         return this.HandleError(new NotFoundException('Course does not exist'));

    //     const existingAssignment = await CourseLecturer.findAll({
    //         where: { lecturerId: ids, courseCode: course.code }
    //     });


    // }

    // async isLecturerAssignedToCourse(lecturerId: number, courseId: number) {
    //     const assignment = await this.courseLecturerModel.findOne({
    //       where: { lecturerId, courseId }
    //     });
    //     return !!assignment;
    //   }

    //   async getAssignedLecturersCount(courseId: number): Promise<number> {
    //     return this.courseLecturerModel.count({ where: { courseId } });
    //   }

    // async reassignLecturer(oldLecturerId: number, newLecturerId: number, courseId: number): Promise<void> {
    //     await this.removeLecturer(oldLecturerId, courseId);
    //     await this.assignLecturer(newLecturerId, courseId);
    // }

    // async getLecturerWorkload(lecturerId: number): Promise<number> {
    //     return this.courseLecturerModel.count({ where: { lecturerId } });
    // }
}

