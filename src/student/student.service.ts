import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { BaseService } from 'src/common';
import { Course, Enrollment, Student } from 'src/database/models';
import { EnrollmentStatus } from "src/database/models/enrollment.model";
import {
  UpdateStudentProfileDto,
  ChangePasswordDto,
  EnrollStudentDto,
  GetStudentDto,
  BulkEnrollStudentDto,
} from './dtos';
import { where } from 'sequelize';

@Injectable()
export class StudentService extends BaseService {
  constructor() {
    super();
  }

  async getStudentByMatric(payload: GetStudentDto) {
    const { matricNo } = payload;
    const user = await Student.findOne({ where: { matricNo } });
    if (!user)
      return this.HandleError(
        new NotFoundException('User not found'),
      );
    return this.Results(user);
  }

  //no controller for now
  async getUserByEmail(email: string) {
    const user = await Student.findOne({ where: { email } });
    if (!user)
      return this.HandleError(
        new NotFoundException('User not found'),
      );
    return this.Results(user);
  }

  async updateStudentProfile(
    {
      matricNo,
      email,
      firstName,
      otherName,
      phone,
      avatar
    }: UpdateStudentProfileDto
  ) {
    const getStudent = await this.getStudentByMatric({ matricNo });

    if (getStudent.isError || !getStudent.data) return getStudent;

    const student = getStudent.data;

    const updatePayload: any = {
      ...(matricNo ? { matricNo } : {}),
      ...(email ? { email } : {}),
      ...(firstName ? { firstName } : {}),
      ...(otherName ? { otherName } : {}),
      ...(phone ? { phone } : {}),
      ...(avatar ? { avatar } : {}),
    };

    await student.update(updatePayload);
  }

  async updatePassword(matricNo: string, { newPassword, password }: ChangePasswordDto) {
    const getUser = await this.getStudentByMatric({ matricNo });

    if (getUser.isError || !getUser.data) return getUser;

    const user = getUser.data;

    if (!user.validatePassword(password))
      return this.HandleError(new BadRequestException('Password is incorrect'));

    await user.update({ password: newPassword });

    return this.Results(user);
  }

  async dropStudent(matricNo: string) {
    const student = await Student.findOne({ where: { matricNo } });
    if (!student)
      return this.HandleError(new NotFoundException('Student Not Found'));

    await student.destroy();
    return this.Results(null);
  }

  async enrollStudent(payload: EnrollStudentDto) {
    const { matricNo, code } = payload;

    const student = await Student.findOne({ where: { matricNo } });
    if (!student)
      return this.HandleError(new NotFoundException('Student Not Found'));

    const course = await Course.findOne({ where: { code } });
    if (!course)
      return this.HandleError(new NotFoundException('Course Not Found'));

    const alreadyEnrolled = await Enrollment.findOne({ where: { matricNo } });
    if (alreadyEnrolled)
      return this.HandleError(new BadRequestException('This student is already enrolled'));

    const enroll = await Enrollment.create({
      matricNo,
      code,
      status: EnrollmentStatus.ACTIVE,
      enrollmentDate: new Date(),
      dropDate: null
    });

    return this.Results(enroll);
  }

  async unenroll(payload: EnrollStudentDto) {
    const { matricNo, code } = payload;

    const student = await Student.findOne({ where: { matricNo } });
    if (!student)
      return this.HandleError(new NotFoundException('Student Not Found'));

    const enrolled = await Enrollment.findOne({ where: { matricNo } });
    if (!enrolled)
      return this.HandleError(new NotFoundException('This student is not enrrolled'));

    enrolled.status = EnrollmentStatus.DROPPED;
    enrolled.dropDate = new Date();
    await enrolled.save();
    return this.Results(enrolled);
  }

  async renrollStudent({ matricNo, code }: EnrollStudentDto) {
    const enrollment = await Enrollment.findOne({ where: { matricNo, code } });
    if (!enrollment)
      return this.HandleError(new NotFoundException('This student has not enrolled for this course'));
    if (enrollment.status !== EnrollmentStatus.DROPPED)
      return this.HandleError(new BadRequestException('This student is still enrroled for this course'));

    enrollment.status = EnrollmentStatus.ACTIVE;
    enrollment.dropDate = null;
    await enrollment.save();

    return this.Results(enrollment);
  }

  async bulkEnroll({ matricNos, code }: BulkEnrollStudentDto) {
    const course = await Course.findOne({ where: { code } });
    if (!course)
      return this.HandleError(new NotFoundException('Course Not Found'));

    const enrrolments = await Promise.all(
      matricNos.map(async (matricNo) => {
        try {
          return await this.enrollStudent({ matricNo, code, });
        } catch (error) {
          console.error(`Failed to enroll student ${matricNo} in course ${code}:`, error.message);
          return null;
        }
      })
    );

    return this.Results(enrrolments);
  }

  async getEnrollmentStatus({ matricNo, code }: EnrollStudentDto) {
    const enrollment = await Enrollment.findOne({ where: { matricNo, code } });

    // const status = enrollment ? enrollment.status : EnrollmentStatus.NOT_ENROLLED;
    const status = enrollment.status;
    return this.Results(status);
  }

  async getStudentCourses(matricNo: string) {
    const enrolledCourses = await Enrollment.findAll({
      where: { matricNo: matricNo, status: EnrollmentStatus.ACTIVE },
      include: [{ model: Course }]
    });
    if (enrolledCourses.length === 0) {
      return this.HandleError(new NotFoundException('courses not found'));
    }
    const courses = enrolledCourses.map(enrollment => enrollment.code);

    return this.Results(courses);
  }


  async getEnrolledStudents(code: string) {
    const enrrolments = await Enrollment.findAll({
      where: { code: code, status: EnrollmentStatus.ACTIVE },
      include: [{ model: Student }]
    });

    if (enrrolments.length === 0) {
      return this.HandleError(new NotFoundException('students not found'));
    }

    const students = enrrolments.map(enrrolment => enrrolment.matricNo);

    return this.Results(students);
  }

  async getStudentGrades() { }

  async calculateGPA() { }

  async getStudentAttendance() { }

  async getStudentAssignments() { }

  async submitAssignment() { }

  async getStudentExams() { }

}
