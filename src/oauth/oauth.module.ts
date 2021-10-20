import {Module} from '@nestjs/common';
import {OauthController} from './oauth.controller';
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {getJWTConfig} from "../configs/jwt.config";
import { OauthService } from './oauth.service';
import {ConfigModule} from "@nestjs/config";

@Module({
    controllers: [OauthController],
    imports: [
        ConfigModule.forRoot(),
        PassportModule,
        JwtStrategy,
        JwtModule.registerAsync({
            useFactory: getJWTConfig
        })
    ],
    providers: [OauthService]
})
export class OauthModule {
}
