import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { GetShopFilterDto } from './dto/get-shops-filter.dto';
import { Shop } from './shop.entity';
import { AuthGuard } from '@nestjs/passport';
import { BuyAnimalDto } from './dto/buy-animal.dto';
import { GetPerson } from 'src/auth/get-person.decorator';
import { Person } from 'src/people/person.entity';
import { GetAnimalFilterDto } from 'src/animals/dto/get-animal-filter.dto';
import { Animal } from 'src/animals/animal.entity';
import { CreateAnimalDto } from 'src/animals/dto/create-animal.dto';
import { Pet } from 'src/pets/pet.entity';

@Controller('shops')
export class ShopsController {
    constructor(
        private shopsService: ShopsService,
        ){}

    @Get()
    getShops(@Query(ValidationPipe) filterDto: GetShopFilterDto): Promise<Shop[]>{
        return this.shopsService.getShops(filterDto);
    }

    @Get('/:id')
    getShopById(@Param('id', ParseIntPipe) id: number): Promise<Shop>{
        return this.shopsService.getShopById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createShop(@Body() createShopDto: CreateShopDto):Promise<Shop>{
        return this.shopsService.createShop(createShopDto);
    }

    @Delete('/:id')
    deleteShop(
        @Param('id', ParseIntPipe) id: number):Promise<void>{
        return this.shopsService.deleteShop(id);
    }

    @Get('/:id/animals')
    getAnimals(
        @Param('id', ParseIntPipe) id: number,
        @Query(new ValidationPipe({
            transform: true,
            transformOptions: {enableImplicitConversion: true},
            forbidNonWhitelisted: true
        })) filterDto: GetAnimalFilterDto
        ): Promise<Animal[]>{
        return this.shopsService.getAnimals(filterDto, id);
    }

    @Post('/:id/animals')
    createAnimal(
        @Param('id', ParseIntPipe) id: number,
        @Query(new ValidationPipe({
            transform: true,
            transformOptions: {enableImplicitConversion: true},
            forbidNonWhitelisted: true
        })) filterDto: CreateAnimalDto
        ): Promise<Animal>{
        return this.shopsService.createAnimal(filterDto, id);
    }

    @Post('/:id/buy')
    @UseGuards(AuthGuard())
    buyAnimal(
        @Param('id', ParseIntPipe) id: number,
        @Query(new ValidationPipe({
            transform: true,
            transformOptions: {enableImplicitConversion: true},
            forbidNonWhitelisted: true
        })) filterDto: BuyAnimalDto,
        @GetPerson() person: Person,
        ): Promise<Pet>{
        return this.shopsService.buyAnimal(id, filterDto, person);
    }

    
}
