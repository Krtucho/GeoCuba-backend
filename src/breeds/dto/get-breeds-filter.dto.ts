import { IsNotEmpty, IsOptional } from "class-validator";

export class GetBreedFilterDto{
    @IsOptional()
    @IsNotEmpty()
    search:string
}