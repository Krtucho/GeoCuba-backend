import { Animal } from "src/animals/animal.entity";
import { Pet } from "src/pets/pet.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Breed extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @OneToMany(type => Animal, animal => animal.breed, {eager:true})
    animals: Animal[];

    @OneToMany(type => Pet, pet => pet.breed, {eager:true})
    pets: Pet[];
}