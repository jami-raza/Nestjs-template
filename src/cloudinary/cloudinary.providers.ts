import { ConfigService } from '@nestjs/config';
import {v2} from 'cloudinary';

export const CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: (configService: ConfigService) => {
        return v2.config({
            cloud_name: 'dhlcvjc4c',
            api_key: '367635713516182',
            api_secret: 'zciQ2z5arwzSFXHhK8jP7FBtrCs'
        })
    }
}