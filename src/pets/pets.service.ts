import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { PetRepository } from './pet.repository';
import { GetPetFilterDto } from './dto/get-pets-filter.dto';
import { Person } from 'src/people/person.entity';
import { Breed } from 'src/breeds/breed.entity';


@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(PetRepository)
        private petRepository: PetRepository,
    ){}

    async getPets(
        filterDto: GetPetFilterDto,
        person:Person,
        ):Promise<Pet[]>{
        return this.petRepository.getPets(filterDto, person);
    }

    async getPetById(id: number, ownerId:number):Promise<Pet>{
        const found = await this.petRepository.findOneBy({id, ownerId});

        if(!found){
            throw new NotFoundException(`Breed with ID "${id}" not found`)
        }

        return found;
    }

    async createPet(owner:Person, breed:Breed, name:string,):Promise<Pet>{
        return this.petRepository.createPet(owner, breed, name);
    }

    async deletePet(id: number):Promise<void>{
        const result = await this.petRepository.delete(id);
        console.log(result);
    }
}
