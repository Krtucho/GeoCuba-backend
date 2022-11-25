import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(15)
    name: string;

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    username: string;
    
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.[a-z]).*$/,
    {message: 'THe password is too weak.'},
    )
    password: string;
}