// import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
// import { BaseService } from "src/common";
// import { EnrollmentDto, bulkEnrollDto } from "./dtos";
// import { CourseService } from "./course.service";
// import { Course, Enrollment, Student } from "src/database/models";
// import { EnrollmentStatus } from "src/database/models/enrollment.model";
// import { StudentService } from "src/student/student.service";

// @Injectable()
// export class CourseEnrollment extends BaseService {
//     constructor(
//         private readonly courseService: CourseService,
//         private readonly studentService: StudentService,
//     ) {
//         super();
//     }

//     async enrollStudent({ matricNo, code, name }: EnrollmentDto) {
//         await this.studentService.getStudentByMatric({ matricNo });
//         await this.courseService.getCourse({ code, name });

//         const enrolled = await Enrollment.findOne({ where: { matricNo, code } });
//         if (enrolled) return this.HandleError(
//             new ConflictException('You have already enrolled for this course.')
//         );

//         const enrole = await Enrollment.create({
//             matricNo,
//             code,
//             status: EnrollmentStatus.ACTIVE,
//             enrollmentDate: new Date(),
//             dropDate: null
//         });

//         return this.Results(enrole);
//     }

//     async unenrollStudent({ matricNo, code, name }: EnrollmentDto) {
//         await this.studentService.getStudentByMatric({ matricNo });
//         await this.courseService.getCourse({ code, name });

//         const enrollment = await Enrollment.findOne({ where: { matricNo, code } });
//         if (!enrollment) return this.HandleError(
//             new ConflictException('You have not enrolled for this course.')
//         );

//         enrollment.status = EnrollmentStatus.DROPPED;
//         enrollment.dropDate = new Date();
//         await enrollment.save();

//         return this.Results(enrollment);
//     }

//     async renrollStudent({ matricNo, code, name }: EnrollmentDto) {
//         const enrollment = await Enrollment.findOne({ where: { matricNo, code } });
//         if (!enrollment) return this.HandleError(
//             new NotFoundException('Dropped enrollment not found')
//         );

//         enrollment.status = EnrollmentStatus.ACTIVE;
//         enrollment.dropDate = null;
//         await enrollment.save();

//         return this.Results(enrollment);
//     }

//     // async getStudentCourses(matricNo: string) {
//     //     const enrolledCourses = await Enrollment.findAll({
//     //         where: { matricNo, status: EnrollmentStatus.ACTIVE },
//     //         include: [{ model: Course }]
//     //     });
//     //     const courses = enrolledCourses.map(enrollment => enrollment.code)

//     //     return this.Results(courses);
//     // }

//     async getStudentCourses(matricNo: string) {
//         const enrolledCourses = await Enrollment.findAll({
//             where: { matricNo: matricNo, status: EnrollmentStatus.ACTIVE },
//             include: [{ model: Course }]
//         });
//         const courses = enrolledCourses.map(enrollment => enrollment.code);

//         return this.Results(courses);
//     }

//     async getEnrolledStudents(code: string) {
//         const enrrolments = await Enrollment.findAll({
//             where: { code: code, status: EnrollmentStatus.ACTIVE },
//             include: [{ model: Student }]
//         });

//         const students = enrrolments.map(enrrolment => enrrolment.matricNo);

//         return this.Results(students);
//     }

//     async getEnrollmentStatus({ matricNo, code }: EnrollmentDto) {
//         const enrollment = await Enrollment.findOne({ where: { matricNo, code } });

//         const status = enrollment ? enrollment.status : EnrollmentStatus.NOT_ENROLLED;

//         return this.Results(status);
//     }

//     async bulkEnroll({ matricNos, code, name }: bulkEnrollDto) {
//         await this.courseService.getCourse({ code, name });

//         const enrrolments = await Promise.all(
//             matricNos.map(async (matricNo) => {
//                 try {
//                     return await this.enrollStudent({ matricNo, code, name });
//                 } catch (error) {
//                     console.error(`Failed to enroll student ${matricNo} in course ${code}:`, error.message);
//                     return null;
//                 }
//             })
//         );

//         return this.Results(enrrolments);
//     }
// }