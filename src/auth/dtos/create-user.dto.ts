import {
    IsString,
    IsNotEmpty,
    Matches,
    IsStrongPassword,
    IsOptional,
    IsEnum,
    IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Gender {
    Male = 'Male',
    Female = 'Female',
}

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 5,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1,
    })
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/\d\d\d\d-\d\d-\d\d/)
    dob: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    home_address: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('VN')
    phone_number: string;

    @ApiProperty()
    @IsString()
    @IsEnum(Gender)
    gender: string;
}
