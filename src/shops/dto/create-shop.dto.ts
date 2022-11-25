import { IsAlpha, IsNotEmpty } from "class-validator";

export class CreateShopDto{
    @IsNotEmpty()
    name: string;
}