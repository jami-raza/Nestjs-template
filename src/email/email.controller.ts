import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

@ApiTags('Email')
@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService){}

    @Post('send')
    async sendEmail(@Query('email') email: string) {
        const mail = {
            to: email,
            subject: 'Greeting Message from NestJS Sendgrid',
            from: 'career@fissionltd.com',
            text: 'Hello World from NestJS Sendgrid',
            html: '<h1>Hello World from NestJS Sendgrid</h1>'
        };

        return await this.emailService.send(mail);
    }

}
