import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Animal } from "./animal.entity";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { Shop } from "src/shops/shop.entity";
import { Breed } from "src/breeds/breed.entity";
import { GetAnimalFilterDto } from "./dto/get-animal-filter.dto";
import { BuyAnimalDto } from "src/shops/dto/buy-animal.dto";
import { UnauthorizedException } from "@nestjs/common";

@CustomRepository(Animal)
export class AnimalRepository extends Repository<Animal>{
    async getAnimals(filterDto: GetAnimalFilterDto, shopId:number=0): Promise<Animal[]>{
        const {price, amount} = filterDto;
        const query = this.createQueryBuilder('animal');

        if(shopId){
            query.where('animal.shop = :shopId', {shopId});
        }

        if(price){
            query.andWhere('animal.price <= :price', {price});
        }

        if(amount){
            query.andWhere('animal.amount >= :amount', {amount});
        }

        const animals = await query.getMany();
        return animals;
    }
    
    async createAnimal(createAnimalDto: CreateAnimalDto, shop:Shop, breed:Breed):Promise<Animal>{
        const animal = new Animal();
        const { price, amount } = createAnimalDto;

        animal.price = price;
        animal.amount = amount;
        animal.shop = shop;
        animal.breed = breed;

        await animal.save();

        delete animal.shop;
        delete animal.breed;
        
        return animal;
    }

    async modifyAnimal(buyAnimalDto: BuyAnimalDto, animal:Animal):Promise<Animal>{
        const { animalId, amount, petName } = buyAnimalDto;

        if (amount > animal.amount){
            throw new UnauthorizedException('The amount is greather than the available amount.');
        }

        animal.amount -= amount;
        await animal.save();

        if (animal.amount == 0){
            await this.delete({id:animal.id});
            return null;
        }

        delete animal.shop;
        delete animal.breed;

        return animal;
    }
}