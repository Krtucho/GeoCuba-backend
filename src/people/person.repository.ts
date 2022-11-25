import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Person } from "./person.entity";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";

@CustomRepository(Person)
export class PersonRepository extends Repository<Person>{
    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        const { name, username, password} = authCredentialsDto;

        const person = new Person()
        person.name = name;
        person.username = username;
        person.salt = await bcrypt.genSalt();
        person.password = await this.hashPassword(password, person.salt);
        person.img = "";

        try{
            await person.save();
        }
        catch(error){
            if (error.code === '23505'){
                throw new ConflictException("Username already exists");
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>{
        const { name, username, password} = authCredentialsDto;
        const person = await this.findOneBy({ username });

        if (person && await person.validatePassword(password)){
            return person.username;
        }
        else{
            return null;
        }
    }

    private async hashPassword(password: string, salt: string):Promise<string>{
        return bcrypt.hash(password, salt);
    }
}