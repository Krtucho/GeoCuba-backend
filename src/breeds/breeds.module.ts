import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { BreedRepository } from './breed.repository';
import { BreedsController } from './breeds.controller';
import { BreedsService } from './breeds.service';

@Module({
  imports:[
    TypeOrmExModule.forCustomRepository([BreedRepository])
  ],
  controllers: [BreedsController],
  providers: [BreedsService],
  exports:[
    TypeOrmExModule,
  ]
})
export class BreedsModule {}