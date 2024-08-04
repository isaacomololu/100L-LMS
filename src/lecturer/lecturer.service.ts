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
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from 'src/auth/auth.interface';
import { Op } from 'sequelize';

@Injectable()
export class LecturerService extends BaseService {
    constructor(private readonly jwtService: JwtService) {
        super();
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
        const { email, firstName, ...rest } = payload

        const exist = await Lecturer.findOne({ where: { [Op.or]: [{ email }] } });
        if (exist)
            return this.HandleError(
                new BadRequestException('Lecturer already exist')
            );

        if (exist?.email === email)
            return this.HandleError(
                new BadRequestException('Lecturer with this Id already exists')
            );

        const lecturer = await Lecturer.create({
            ...rest,
            email,
            firstName
        });

        return this.Results(lecturer);
    }

    async signin(payload: SigninDto) {
        const { matricNo, password } = payload

        const lecturer = await await Lecturer.findOne({ where: { matricNo } });;

        if (!lecturer || !lecturer.validatePassword(password))
            return this.HandleError(
                new BadRequestException("Incorrect Credentials")
            );

        const accessToken = this.signJWT(lecturer);

        return this.Results(accessToken);
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
            ...(id ? { id } : {}),
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
