import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
export class LoginUserDto extends PartialType(CreateUserDto) {
}
