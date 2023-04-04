import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

//    async findOneWUsername(username: string): Promise<User | null> {
//        return this.prismaService.user.findUnique({
//            where: {
//                username,
//            },
//        });
//    }

    async getUser(params: { where: Prisma.UserWhereUniqueInput }) {
        const { where } = params;
        return this.prismaService.user.findUnique({ where });
    }

    async createUser(params: { data: Prisma.UserCreateInput }): Promise<User> {
        const { data } = params;
        const user = await this.prismaService.user.create({
            data,
        });
        return user;
    }
}
