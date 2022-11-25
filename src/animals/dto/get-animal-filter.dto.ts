import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class GetAnimalFilterDto{
    @IsOptional()
    @IsNumber()
    @Min(0.1)
    price: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    amount:number
}