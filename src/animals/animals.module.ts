import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { AnimalRepository } from './animal.repository';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';

@Module({
  imports:[
    TypeOrmExModule.forCustomRepository([AnimalRepository])
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
  exports:[
    TypeOrmExModule,
  ]
})
export class AnimalsModule {}
