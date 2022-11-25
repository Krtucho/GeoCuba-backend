import { IsNotEmpty, IsOptional } from "class-validator";

export class GetPetFilterDto{
    @IsOptional()
    @IsNotEmpty()
    search:string
}