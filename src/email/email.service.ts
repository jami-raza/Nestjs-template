import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
    constructor(private readonly configService: ConfigService){
        SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
    }
    
    async send(mail: SendGrid.MailDataRequired){
        // console.log("Check Error")
        const transport = await SendGrid.send(mail)
        // console.log(transport,"Transport")
        // console.log(`Email successfully dispatched to ${mail.to}`)
        return transport;

    }
}
