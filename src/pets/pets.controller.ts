import { Controller, Get, Param, ParseIntPipe, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { PetsService } from './pets.service';
import { GetPetFilterDto } from './dto/get-pets-filter.dto';
import { Pet } from './pet.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetPerson } from 'src/auth/get-person.decorator';
import { Person } from 'src/people/person.entity';

@Controller('pets')
@UseGuards(AuthGuard())
export class PetsController {
    constructor(private petsSerice: PetsService){}

    @Get()
    getPets(
        @Query(ValidationPipe) filterDto: GetPetFilterDto,
        @GetPerson() person:Person,
        ): Promise<Pet[]>{
        return this.petsSerice.getPets(filterDto, person);
    }

    @Get('/:id')
    getPetById(
    @Param('id', ParseIntPipe) id: number,
    @GetPerson() person:Person,
    ): Promise<Pet>{
        return this.petsSerice.getPetById(id, person.id);
    }
}
