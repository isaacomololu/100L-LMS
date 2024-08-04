import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { BaseService } from 'src/common';
import { Course, Enrollment, Student } from 'src/database/models';
import {
  UpdateStudentProfileDto,
  ChangePasswordDto,
  EnrollStudentDto,
  GetStudentDto,
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
      return this.HandleError(new BadRequestException('The student is already enrolled'));

    const enroll = await Student.create({
      matricNo,
      code,
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

    await enrolled.destroy();
    return this.Results(null);
  }

  async getStudentGrades() { }

  async calculateGPA() { }

  async getStudentAttendance() { }

  async getStudentAssignments() { }

  async submitAssignment() { }

  async getStudentExams() { }

}
