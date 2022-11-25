import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Animal } from "src/animals/animal.entity";
import { Person } from "src/people/person.entity";
import { Breed } from "src/breeds/breed.entity";
import { Pet } from "src/pets/pet.entity";
import { Shop } from "src/shops/shop.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'containers-us-west-72.railway.app',
    port: 5432,
    username: 'postgres',
    password: '7bDVSGdyDkP9j6MLTmXp',
    database: 'animalshop2',
    entities: [
        Breed,
        Person,
        Shop,
        Animal,
        Pet,
    ],
    synchronize: true,
}

// export const typeOrmConfig: TypeOrmModuleOptions = {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'set_username',
//     password: 'set_password',
//     database: 'database_name',
//     entities: [
//         Breed,
//         Person,
//         Shop,
//         Animal,
//         Pet,
//     ],
//     synchronize: true,
// }