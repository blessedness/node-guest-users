import {JwtModuleOptions} from "@nestjs/jwt";
import * as fs from "fs";

export const getJWTConfig = async (): Promise<JwtModuleOptions> => {
    return {
        privateKey: fs.readFileSync(__dirname + '/../../storage/oauth-private.key'),
    }
}
