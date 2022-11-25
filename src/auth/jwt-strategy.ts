import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Person } from '../people/person.entity';
import { PersonRepository } from 'src/people/person.repository';

export class JwtStrategy extends PassportStrategy(Strategy){
	constructor(
		@InjectRepository(PersonRepository)
		private personRepository: PersonRepository,
	){
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'topSecret51',
		});
	}

	async validate(payload: JwtPayload): Promise<Person>{
		const { username } = payload;
		const person = await this.personRepository.findOneBy({username});

		if(!person){
			throw new UnauthorizedException();
		}
		return person;
	}
}