import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { PetRepository } from './pet.repository';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

@Module({
  imports:[
    TypeOrmExModule.forCustomRepository([PetRepository]),
    AuthModule,
  ],
  controllers: [PetsController],
  providers: [PetsService],
  exports:[
    TypeOrmExModule,
  ]
})
export class PetsModule {}
