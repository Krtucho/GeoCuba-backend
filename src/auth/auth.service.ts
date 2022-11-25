import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/people/person.entity';
import { PersonRepository } from 'src/people/person.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(PersonRepository)
        private personRepository: PersonRepository,
        private jwtService: JwtService,
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.personRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
        const username = await this.personRepository.validateUserPassword(authCredentialsDto);

        if(!username){
            throw new UnauthorizedException('Invalid')
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }

    async modifyUserImage(filename: string, person:Person): Promise<Person> {
        person.img = filename;
        await person.save();

        return person;
    }
}
