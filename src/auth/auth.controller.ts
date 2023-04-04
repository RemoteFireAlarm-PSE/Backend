import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: LoginUserDto) {
        return this.authService.login(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('test-jwt')
    testJwt(@Request() req: any) {
        return req.user;
    }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return this.authService.createUser(body);
    }

}
