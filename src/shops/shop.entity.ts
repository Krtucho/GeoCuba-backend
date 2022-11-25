import { Animal } from "src/animals/animal.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shop extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @OneToMany(type => Animal, animal => animal.shop, {eager: true})
    animals: Animal[];
}