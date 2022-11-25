import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './breed.entity';
import { BreedRepository } from './breed.repository';
import { CreateBreedDto } from './dto/create-breed.dto';
import { GetBreedFilterDto } from './dto/get-breeds-filter.dto';

@Injectable()
export class BreedsService {
    constructor(
        @InjectRepository(BreedRepository)
        private breedRepository: BreedRepository,
    ){}

    async getBreeds(filterDto: GetBreedFilterDto):Promise<Breed[]>{
        return this.breedRepository.getBreeds(filterDto);
    }

    async getBreedById(id: number):Promise<Breed>{
        const found = await this.breedRepository.findOneBy({id});

        if(!found){
            throw new NotFoundException(`Breed with ID "${id}" not found`)
        }

        return found;
    }

    async createBreed(createBreedDto: CreateBreedDto):Promise<Breed>{
        return this.breedRepository.createBreed(createBreedDto);
    }

    async deleteBreed(id: number):Promise<void>{
        const result = await this.breedRepository.delete(id);
        console.log(result);
    }

    async updateBreed(id: number, createBreedDto: CreateBreedDto): Promise<Breed>{
        const breed = await this.getBreedById(id);
        return await this.breedRepository.updateBreed(breed, createBreedDto);
    }
}
