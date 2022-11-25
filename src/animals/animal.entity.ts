import { Breed } from "src/breeds/breed.entity";
import { Shop } from "src/shops/shop.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Animal extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"float"})
    price: number;

    @Column()
    amount: number;

    @ManyToOne(type => Shop, shop => shop.animals, {eager:false})
    shop: Shop;

    @ManyToOne(type => Breed, breed => breed.animals, {eager:false})
    breed: Breed;

    @Column()
    shopId:number;

    @Column()
    breedId:number;
}