import { Length } from "class-validator"

/* eslint-disable prettier/prettier */
export class CreateEventDto {
    @Length(5, 100, { message: "Name length must be greater than 5 words" })
    name: string
    description: string
    when: string
    address: string
}