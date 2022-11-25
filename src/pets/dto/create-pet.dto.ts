import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePetDto{
    @IsOptional()
    @IsNotEmpty()
    name: string;
}