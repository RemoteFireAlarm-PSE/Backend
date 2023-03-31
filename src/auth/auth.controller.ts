import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import * as express from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: express.Request) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return this.authService.createUser(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('test-jwt')
    testJwt(@Request() req: any) {
        return req.user;
    }
}
