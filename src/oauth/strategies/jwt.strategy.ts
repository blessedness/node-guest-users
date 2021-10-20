import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import * as fs from "fs";
import {JwtDto} from "../dto/jwt.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: fs.readFileSync(__dirname + '/../../../storage/oauth-public.key')
        });
    }

    async validate(jwt: Pick<JwtDto, any>) {
        return jwt;
    }
}
