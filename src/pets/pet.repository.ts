import { Person } from "src/people/person.entity";
import { Breed } from "src/breeds/breed.entity";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { GetPetFilterDto } from "./dto/get-pets-filter.dto";
import { Pet } from "./pet.entity";

@CustomRepository(Pet)
export class PetRepository extends Repository<Pet>{
    async getPets(
        filterDto: GetPetFilterDto,
        person:Person,
        ): Promise<Pet[]>{
        const {search} = filterDto;
        const query = this.createQueryBuilder('pet');

        query.where('pet.ownerId = :ownerId', {ownerId: person.id});

        if (search){
            query.andWhere('pet.name LIKE :search', {search: `%${search}`});
        }

        const pets = await query.getMany();
        return pets;
    }
    
    async createPet(owner:Person, breed:Breed, name:string):Promise<Pet>{
        const pet = new Pet();
        
        if (name)
            pet.name = name;
        else
            pet.name = "";
        pet.breed = breed;
        pet.owner = owner;

        await pet.save();

        await delete pet.breed;
        await delete pet.owner;

        return pet;
    }
}