import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async findOneWUsername(username: string): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: {
                username,
            },
        });
    }

    async createNewUser(
        firstname: string,
        lastname: string,
        username: string,
        password: string,
        dob: string,
        homeaddress: string,
        phonenumber: string,
        gender: string,
    ) {
        const user = await this.prismaService.user.create({
            data: {
                firstname,
                lastname,
                username,
                password,
                dob,
                homeaddress,
                phonenumber,
                gender,
            },
        });
        return user;
    }
}
