import { IsNumber,IsPositive, Min } from "class-validator";

export class CreateAnimalDto{
    @IsNumber({maxDecimalPlaces: 4})
    @Min(0.1)
    price: number;

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsNumber()
    @IsPositive()
    breedId: number;
}