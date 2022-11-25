import { IsNotEmpty, IsOptional } from "class-validator";

export class GetShopFilterDto{
    @IsOptional()
    @IsNotEmpty()
    search:string
}