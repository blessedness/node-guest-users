import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {JwtDto} from "./dto/jwt.dto";
import {v4 as uuidv4} from 'uuid';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class OauthService {
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    }

    async guestTokens(jwt: JwtDto) {
        const payload = {
            aud: jwt.aud,
            user_uuid: uuidv4(),
            scopes: [
                "oauth:guest"
            ]
        };

        return {
            access_token: await this.accessToken(payload),
            refresh_token: await this.refreshToken(payload),
        }
    }

    async accessToken(payload: object): Promise<string> {
        const data = {
            ...payload,
            jti: uuidv4(),
            scheme: this.configService.get('APP_URL') + "/scheme/guest/access-token",
        };

        const expiresIn = this.configService.get('GUEST_USER_ACCESS_TOKEN_TTL');

        return this.jwt(data, expiresIn);
    }

    async refreshToken(payload: object): Promise<string> {
        const data = {
            ...payload,
            scheme: this.configService.get('APP_URL') + "/scheme/guest/refresh-token",
        };

        const expiresIn = this.configService.get('GUEST_USER_REFRESH_TOKEN_TTL');

        return this.jwt(data, expiresIn);
    }

    async jwt(payload: object, expiresIn: number): Promise<string> {
        return this.jwtService.signAsync(payload, {algorithm: 'RS256', expiresIn: expiresIn + 's'})
    }
}
