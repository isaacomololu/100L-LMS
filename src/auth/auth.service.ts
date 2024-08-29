import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseService } from 'src/common';
import { JWTPayload } from './auth.interface';
import { Lecturer, Student } from 'src/database/models';
import { StudentSigninDto, LecturerSigninDto, StudentSignupDto, LecturerSignupDto, LecturerPasswordResetDTO, StudentPasswordResetDTO } from './dto';
import { Op } from 'sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super()
  }

  async signJWT(payload: any) {
    console.log('JWT_SECRET in AuthService:', this.configService.get<string>('JWT_SECRET'));
    const accessToken = this.jwtService.sign(payload);
    return this.Results(accessToken);
  }

  async verifyJwt(jwt: string) {
    try {
      const user: JWTPayload = this.jwtService.verify(jwt);
      return this.Results(user);
    } catch (error) {
      if (error.message.includes('expired')) {
        return this.HandleError(
          new UnauthorizedException('Token Expired! Please Sign in.'),
        );
      }
      if (error.message.includes('invalid')) {
        return this.HandleError(
          new UnauthorizedException('Invalid Token! Please Sign in.'),
        );
      }
      throw error;
    }
  }

  async lecturerSignup(payload: LecturerSignupDto) {
    const { email, firstName, ...rest } = payload

    const exist = await Lecturer.findOne({ where: { email } });
    if (exist)
      return this.HandleError(
        new BadRequestException('User with this Email Address already exists')
      );

    const lecturer = await Lecturer.create({
      ...rest,
      email,
      firstName
    });

    // const jwtPayload = {
    //   id: lecturer.id,
    //   email: lecturer.email,
    //   lastLoggedInAt: lecturer.lastLoggedInAt,
    // };

    // const { data: accessToken } = await this.signJWT(jwtPayload);

    return this.Results({ /*accessToken,*/ lecturer });
  }

  async studentSignup(payload: StudentSignupDto) {
    const { email, matricNo, firstName, ...rest } = payload

    const exist = await Student.findOne({ where: { [Op.or]: [{ email }, { matricNo }] } });
    if (exist) {
      if (exist.matricNo === matricNo)
        return this.HandleError(
          new BadRequestException('User with this Matriculation Number already exists')
        );

      if (exist.email === email)
        return this.HandleError(
          new BadRequestException('User with this Email Address already exists')
        );
    }

    const student = await Student.create({
      ...rest,
      email,
      matricNo,
      firstName
    });

    // const jwtPayload = {
    //   email: student.email,
    //   lastLoggedInAt: student.lastLoggedInAt,
    //   matricNo: student.matricNo,
    // };

    // const { data: accessToken } = await this.signJWT(jwtPayload);

    return this.Results({ /*accessToken*/ student });
  }

  async lecturerSignin(payload: LecturerSigninDto) {
    const { id, password } = payload

    const lecturer = await await Lecturer.findOne({ where: { id } });;

    if (!lecturer || !lecturer.validatePassword(password))
      return this.HandleError(
        new BadRequestException("Incorrect Credentials")
      );

    const accessToken = await this.signJWT(lecturer);

    return this.Results(accessToken);
  }

  async studentSignin(payload: StudentSigninDto) {
    const { matricNo, password } = payload

    const student = await await Student.findOne({ where: { matricNo } });;

    if (!student || !student.validatePassword(password))
      return this.HandleError(
        new BadRequestException("Incorrect Credentials")
      );

    // const accessToken = await this.signJWT(student);
    // return this.Results(accessToken);
    return this.Results(student);
  }

  async initiateLecturerPasswordReset(payload: LecturerPasswordResetDTO) {
    const { email, id } = payload;
    const lecturer = await Lecturer.findOne({ where: { id } });

    if (!lecturer)
      return this.HandleError(
        new NotFoundException('Lecturer not found')
      );

    return this.Results({ email });
  }

  async initiateStudentPasswordReset(payload: StudentPasswordResetDTO) {
    const { email, matricNo } = payload;
    const student = await Student.findOne({ where: { matricNo } });

    if (!student)
      return this.HandleError(
        new NotFoundException('Student not found')
      );

    return this.Results({ email });
  }
}

