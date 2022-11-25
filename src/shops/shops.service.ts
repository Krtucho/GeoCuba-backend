import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { ShopRepository } from './shop.repository';
import { CreateShopDto } from './dto/create-shop.dto';
import { GetShopFilterDto } from './dto/get-shops-filter.dto';
import { BuyAnimalDto } from './dto/buy-animal.dto';
import { Person } from 'src/people/person.entity';
import { PetRepository } from 'src/pets/pet.repository';
import { BreedRepository } from 'src/breeds/breed.repository';
import { AnimalRepository } from 'src/animals/animal.repository';
import { Animal } from 'src/animals/animal.entity';
import { GetAnimalFilterDto } from 'src/animals/dto/get-animal-filter.dto';
import { CreateAnimalDto } from 'src/animals/dto/create-animal.dto';
import { Pet } from 'src/pets/pet.entity';

@Injectable()
export class ShopsService {
    constructor(
        @InjectRepository(ShopRepository)
        private shopRepository: ShopRepository,
        @InjectRepository(PetRepository)
        private petRepository: PetRepository,
        @InjectRepository(BreedRepository)
        private breedRepository: BreedRepository,
        @InjectRepository(AnimalRepository)
        private animalRepository: AnimalRepository,
    ){}

    async getShops(filterDto: GetShopFilterDto):Promise<Shop[]>{
        return this.shopRepository.getShops(filterDto);
    }

    async getShopById(id: number):Promise<Shop>{
        const found = await this.shopRepository.findOneBy({id});

        if(!found){
            throw new NotFoundException(`Shop with ID "${id}" not found`);
        }

        return found;
    }

    async createShop(createShopDto: CreateShopDto):Promise<Shop>{
        return this.shopRepository.createShop(createShopDto);
    }

    async deleteShop(id: number):Promise<void>{
        const result = await this.shopRepository.delete(id);
        console.log(result);
    }

    //#region Animals
    
    async getAnimals(filterDto: GetAnimalFilterDto, shopId:number): Promise<Animal[]> {
        return await this.animalRepository.getAnimals(filterDto, shopId);
    }

    async createAnimal(filterDto: CreateAnimalDto, ShopId:number){
        const { price, amount, breedId } = filterDto;

        const shop = await this.getShopById(ShopId);
        
        const  breed = await this.breedRepository.findOneBy({id:breedId});
        
        if(!breed){
            throw new NotFoundException(`Breed with ID "${breedId}" Not Found!`);
        }

        return await this.animalRepository.createAnimal(filterDto, shop, breed)
    }

    async buyAnimal(id: number, filterDto: BuyAnimalDto, person:Person):Promise<Pet> {
        const { animalId, amount, petName } = filterDto;

        const shop = await this.getShopById(id);

        const animal:Animal = await this.animalRepository.findOneBy({id:animalId});

        if (!animal){
            throw new NotFoundException(`Animal with ID "${animalId}" not found`)
        }

        const breedId = animal.breedId;

        const  breed = await this.breedRepository.findOneBy({id:breedId});
        
        if(!breed){
            throw new NotFoundException(`Breed with ID "${breedId}" Not Found!`);
        }

        const pet = await this.petRepository.createPet(person, breed, petName);

        await this.animalRepository.modifyAnimal(filterDto, animal);
        
        return pet;
    }
}
