import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common';
import { Course } from 'src/database/models';
import { CreateCourseDto, GetCourseDto, UpdateCourseDto } from './dtos';
import { Op } from 'sequelize';

@Injectable()
export class CourseService extends BaseService{
    constructor() {
        super();
    }

    async getAllCourses() {
        const courses = await Course.findAll();
        return this.Results(courses);
    }
    
    async getCourse(payload: GetCourseDto) {
        const { name, code } = payload;
        const course = await Course.findOne({ where: { [Op.or]: [{ name }, { code }] } });
        if(!course)
            return this.HandleError(
                new NotFoundException("Course dosen't exist")
            );
        return this.Results(course);
    }

    async createCourse(payload: CreateCourseDto) {
        const { 
            name,
            code,
            unit,
            description,
        } = payload;

        const exists = await this.getCourse({ name, code });

        if(exists.isError || !exists.data) exists.errMessage;
    
        const course = await Course.create(payload);

        return this.Results(course);
    }

    async updateCourse({
        name,
        code,
        unit,
        description,
    }: UpdateCourseDto
    ) 
    {
        const exists = await this.getCourse({ name, code });
        if(exists.isError || !exists.data) exists.errMessage;

        const course = exists.data;

        const updatePayload: any = ({
            ...(name ? { name } : {}),
            ...(code ? { code } : {}),
            ...(unit ? { unit } : {}),
            ...(description ? { description }: {}),
        });
        await course.update(updatePayload);

        return this.Results(course);
    }

    async deleteCourse(payload: GetCourseDto) {
        const { name, code } = payload;
        const exist = await this.getCourse(payload);
        if(exist.isError || !exist.data) exist.errMessage;

        const course = exist.data

        await course.destroy();
        return this.Results(null);
    }
}
  
//     
  
//     async addLecturer(courseId: number, lecturerId: number): Promise<Course> {
//       // Associate a lecturer with a course
//     }
  
//     async removeLecturer(courseId: number, lecturerId: number): Promise<Course> {
//       // Remove a lecturer from a course
//     }
  
//     async enrollStudent(courseId: number, studentId: number): Promise<Course> {
//       // Enroll a student in a course
//     }
  
//     async unenrollStudent(courseId: number, studentId: number): Promise<Course> {
//       // Unenroll a student from a course
//     }
  
//     async getEnrolledStudents(courseId: number): Promise<Student[]> {
//       // Get all students enrolled in a course
//     }
  
//     async getCourseLecturers(courseId: number): Promise<Lecturer[]> {
//       // Get all lecturers associated with a course
//     }
  
//     async getCourseMaterials(courseId: number): Promise<LearningMaterial[]> {
//       // Get all learning materials for a course
//     }
//   }
