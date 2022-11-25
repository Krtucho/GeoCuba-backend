import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Pet } from "src/pets/pet.entity";

@Entity()
@Unique(['username'])
export class Person extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    img: string;

    @Column()
    salt: string;

    @OneToMany(type => Pet, pet => pet.owner, {eager:true})
    pets: Pet[]

    async validatePassword(password:string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}