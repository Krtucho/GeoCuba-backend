import { Module } from '@nestjs/common';
import { AnimalsModule } from 'src/animals/animals.module';
import { AuthModule } from 'src/auth/auth.module';
import { BreedsModule } from 'src/breeds/breeds.module';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { PetsModule } from 'src/pets/pets.module';
import { ShopRepository } from './shop.repository';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';

@Module({
  imports:[
    TypeOrmExModule.forCustomRepository([ShopRepository]),
    AuthModule,
    AnimalsModule,
    BreedsModule,
    PetsModule,
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports:[
    AuthModule,
    AnimalsModule,
    BreedsModule,
    PetsModule,
  ]
})
export class ShopsModule {}
