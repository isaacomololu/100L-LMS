import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BaseController } from 'src/common';
import { SigninDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController extends BaseController {
    constructor(private readonly authService: AuthService) {
        super();
    }

    @Post('signup')
    async signUp(@Body() form: SignupDto) {
        const student = await this.authService.signup(form);
        if (student.errMessage) throw student.error;
        return this.response({
            message: 'Student Created Succesfully',
            data: student.data,
        });
    }

    @Post('signin')
    async signIn(@Body() form: SigninDto) {
        const student = await this.authService.signin(form);
        if (student.errMessage) throw student.error;
        return this.response({
            message: 'Student Signed-in Succesfully',
            data: student.data,
        });
    }
}
