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
        const user = await this.authService.signup(form);
        if(user.errMessage) throw user.error;
        return this.response({
            message: 'User Created Succesfully', 
            data: user.data,
        });
    }

    @Post('signin')
    async signIn(@Body() form: SigninDto) {
        const user = await this.authService.signin(form);
        if(user.errMessage) throw user.error;
        return this.response({
            message: 'User Signed-in Succesfully', 
            data: user.data,
        });
    }
}
