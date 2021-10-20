import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {OauthModule} from './oauth/oauth.module';

@Module({
    imports: [
        OauthModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
