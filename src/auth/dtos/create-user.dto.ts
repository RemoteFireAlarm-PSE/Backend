import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    firstname: string;

    @ApiProperty()
    @IsString()
    lastname: string;

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    dob: string;

    @ApiProperty()
    @IsString()
    home_address: string;

    @ApiProperty()
    @IsString()
    phone_number: string;

    @ApiProperty()
    @IsString()
    gender: string;
}
