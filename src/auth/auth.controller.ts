import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetPerson } from './get-person.decorator';
import { Person } from '../people/person.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';


// Options for file upload
export const storage = {
    storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const randomName: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${randomName}${extension}`);
        }
    })
}

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto):Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto){
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/person/upload')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('file', storage ))
    uploadFile(
        @GetPerson() person:Person,
        @UploadedFile() file):Promise<Person>{
        return this.authService.modifyUserImage(file.filename, person);
    }
}
