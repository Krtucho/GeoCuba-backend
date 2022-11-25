import { Person } from "src/people/person.entity";
import { Breed } from "src/breeds/breed.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pet extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @ManyToOne(type => Person, owner => owner.pets, {eager:false})
    owner:Person;

    @Column()
    ownerId:number;

    @ManyToOne(type => Breed, breed => breed.pets, {eager:false})
    breed: Breed;

    @Column()
    breedId:number;
}