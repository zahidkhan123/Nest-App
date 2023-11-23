import { IsString, IsEmail, Length, IsNumber } from 'class-validator';

export class createUserDTO {
    @IsString()
    @Length(5)
    name: string;

    @IsNumber()
    age: number;
    @IsEmail()
    @Length(8)
    email: string;

    @IsString()
    gender: string;
    @IsString()
    @Length(8)
    password: string;

    @IsString()
    @Length(8)
    retypePassword: string;
}
