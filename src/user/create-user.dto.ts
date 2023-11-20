import { IsEmail, IsNumber, IsString } from "class-validator"

export class createUserDTO {
    @IsString()
    address: string
    @IsString()
    name: string
    @IsEmail()
    email: string
    @IsNumber()
    age: number
    @IsString()
    gender: string
}