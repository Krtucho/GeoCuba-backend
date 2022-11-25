import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Breed } from './breed.entity';
import { BreedsService } from './breeds.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { GetBreedFilterDto } from './dto/get-breeds-filter.dto';

@Controller('breeds')
export class BreedsController {
    constructor(private breedsService: BreedsService){}

    @Get()
    getBreeds(@Query(ValidationPipe) filterDto: GetBreedFilterDto): Promise<Breed[]>{
        return this.breedsService.getBreeds(filterDto);
    }

    @Get('/:id')
    getBreedById(@Param('id', ParseIntPipe) id: number): Promise<Breed>{
        return this.breedsService.getBreedById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBreed(@Body() createBreedDto: CreateBreedDto):Promise<Breed>{
        return this.breedsService.createBreed(createBreedDto);
    }

    @Delete('/:id')
    deleteBreed(@Param('id', ParseIntPipe) id: number):Promise<void>{
        return this.breedsService.deleteBreed(id);
    }

    @Patch('/id')
    updateBreed(
        @Param('id', ParseIntPipe) id: number,
        @Body() createBreedDto: CreateBreedDto,
        ):Promise<Breed>{
        return this.breedsService.updateBreed(id, createBreedDto);
    }
}
