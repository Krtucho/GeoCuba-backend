import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from 'src/breeds/breed.entity';
import { Shop } from 'src/shops/shop.entity';
import { Animal } from './animal.entity';
import { AnimalRepository } from './animal.repository';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { GetAnimalFilterDto } from './dto/get-animal-filter.dto';

@Injectable()
export class AnimalsService {
    constructor(
        @InjectRepository(AnimalRepository)
        private animalRepository: AnimalRepository,
    ){}

    async getAnimals(filterDto: GetAnimalFilterDto):Promise<Animal[]>{
        return this.animalRepository.getAnimals(filterDto);
    }

    async getAnimalById(id: number):Promise<Animal>{
        const found = await this.animalRepository.findOneBy({id});

        if(!found){
            throw new NotFoundException(`Animal with ID "${id}" not found`)
        }

        return found;
    }

    async createAnimal(createAnimalDto: CreateAnimalDto, shop:Shop, breed:Breed):Promise<Animal>{
        return this.animalRepository.createAnimal(createAnimalDto, shop, breed);
    }

    async deleteAnimal(id: number):Promise<void>{
        const result = await this.animalRepository.delete(id);
        console.log(result);
    }
}
