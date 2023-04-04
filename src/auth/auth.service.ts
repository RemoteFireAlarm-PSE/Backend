import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(data: LoginUserDto) {
        const { username, password } = data;
        const user = await this.userService.getUser({
            where: {
                username,
            },
        });

        if (!user || !(await argon2.verify(user.password, password))) {
            throw new UnauthorizedException(
                'Username or password is incorrect',
            );
        }

        const payload = { sub: user.id, username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async createUser(newUserData: CreateUserDto) {
        const {
            firstname,
            lastname,
            username,
            password,
            gender,
            dob,
            home_address,
            phone_number,
        } = newUserData;
        const hashedPassword = await argon2.hash(password);
        const user = await this.userService.createUser({
            data: {
                firstname,
                lastname,
                username,
                password: hashedPassword,
                dob,
                homeaddress: home_address,
                phonenumber: phone_number,
                gender,
            },
        });
        {
            const { password, ...result } = user;
            return result;
        }
    }
}
