import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Breed } from "./breed.entity";
import { CreateBreedDto } from "./dto/create-breed.dto";
import { GetBreedFilterDto } from "./dto/get-breeds-filter.dto";

@CustomRepository(Breed)
export class BreedRepository extends Repository<Breed>{
    async getBreeds(filterDto: GetBreedFilterDto): Promise<Breed[]>{
        const {search} = filterDto;
        const query = this.createQueryBuilder('breed');

        if (search){
            query.andWhere('breed.name LIKE :search', {search: `%${search}`});
        }

        const breeds = await query.getMany();
        return breeds;
    }
    
    async createBreed(createBreedDto: CreateBreedDto):Promise<Breed>{
        const breed = new Breed();
        const {name} = createBreedDto;
        console.log(name);
        breed.name = name;
        await breed.save();

        return breed;
    }

    async updateBreed(breed: Breed, createBreedDto: CreateBreedDto):Promise<Breed>{
        const {name} = createBreedDto;
        console.log(name);
        breed.name = name;
        await breed.save();

        return breed;
    }
}