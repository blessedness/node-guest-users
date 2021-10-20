export class JwtDto {
    aud: number;

    jti: string;

    iat: number;

    nbf: number;

    exp: number;

    sub: string;

    scopes: string[];
}
