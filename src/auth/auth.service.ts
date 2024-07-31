import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseService } from 'src/common';
import { JWTPayload } from './auth.interface';
import { User } from 'src/database/models';
import { SigninDto, SignupDto, PasswordResetDTO } from './dto';
import { Op } from 'sequelize';
import { UserService } from 'src/user/user.service';

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
    const { email, matricNo, fullName, ...rest } = payload

    const exist = await User.findOne({ where: { [Op.or]: [/*{ id }*/, { email }, { fullName }, { matricNo }] } });
    if (exist)
      return this.HandleError(
        new BadRequestException('User already exist')
      );

    if (exist?.fullName === fullName)
      return this.HandleError(
        new BadRequestException('User with this name already exists')
      );

    if (exist?.matricNo === matricNo)
      return this.HandleError(
        new BadRequestException('User with this matric number already exists')
      );

    const user = await User.create({
      ...rest,
      email,
      matricNo,
      fullName
    });

    return this.Results(user);
  }

  async signin(payload: SigninDto) {
    const { matricNo, password } = payload

    const user = await await User.findOne({ where: { matricNo } });;

    if (!user || !user.validatePassword(password))
      return this.HandleError(
        new BadRequestException("Incorrect Credentials")
      );

    const accessToken = this.signJWT(user);

    return this.Results(accessToken);
  }

  async initiatePasswordReset(payload: PasswordResetDTO) {
    const { email } = payload;
    const user = await User.findOne({ where: { email } });

    if (!user)
      return this.HandleError(
        new NotFoundException('User not found')
      );

    // const token = user.generateTotp(5, 30);

    // await this.emailService.sendResetPasswordEmail({
    //   email,
    //   token,
    // });

    return this.Results({ email });
  }

}

