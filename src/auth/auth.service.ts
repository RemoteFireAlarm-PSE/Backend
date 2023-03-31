import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUserWUsernamePassword(
        username: string,
        password: string,
    ): Promise<any> {
        const user = await this.userService.findOneWUsername(username);
        if (user && argon2.verify(user.password, password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
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
        const user = await this.userService.createNewUser(firstname, lastname, username, hashedPassword, dob, home_address, phone_number, gender);
        delete user.password;
        return user;
    }
}
