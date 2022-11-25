import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class BuyAnimalDto{
    @IsNumber()
    @Min(1)
    animalId: number;

    @IsNumber()
    @Min(1)
    @Max(1)
    amount: number;

    @IsOptional()
    @IsNotEmpty()
    petName:string;
}