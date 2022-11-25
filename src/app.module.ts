import { Module } from '@nestjs/common';
import { ShopsModule } from './shops/shops.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: 
  [
    TypeOrmModule.forRoot(typeOrmConfig),
    ShopsModule, 
    AuthModule, 
  ],
})
export class AppModule {}
