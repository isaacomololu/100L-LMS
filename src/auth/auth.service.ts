import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseService } from 'src/common';
import { JWTPayload } from './auth.interface';
import { Student } from 'src/database/models';
import { SigninDto, SignupDto, PasswordResetDTO } from './dto';
import { Op } from 'sequelize';

@Injectable()
export class AuthService extends BaseService {
  constructor(private readonly jwtService: JwtService,) {
    super()
  }

  async signJWT(payload: any) {
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

  async signup(payload: SignupDto) {
    const { email, matricNo, firstName, ...rest } = payload

    const exist = await Student.findOne({ where: { [Op.or]: [{ email }, { matricNo }] } });
    if (exist)
      return this.HandleError(
        new BadRequestException('User already exist')
      );

    if (exist?.matricNo === matricNo)
      return this.HandleError(
        new BadRequestException('User with this Matriculation Number already exists')
      );

    const user = await Student.create({
      ...rest,
      email,
      matricNo,
      firstName
    });

    return this.Results(user);
  }

  async signin(payload: SigninDto) {
    const { matricNo, password } = payload

    const student = await await Student.findOne({ where: { matricNo } });;

    if (!student || !student.validatePassword(password))
      return this.HandleError(
        new BadRequestException("Incorrect Credentials")
      );

    const accessToken = this.signJWT(student);

    return this.Results(accessToken);
  }

  async initiatePasswordReset(payload: PasswordResetDTO) {
    const { email, matricNo } = payload;
    const student = await Student.findOne({ where: { matricNo } });

    if (!student)
      return this.HandleError(
        new NotFoundException('Student not found')
      );

    // const token = user.generateTotp(5, 30);

    // await this.emailService.sendResetPasswordEmail({
    //   email,
    //   token,
    // });

    return this.Results({ email });
  }

}

