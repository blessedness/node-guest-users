import {Controller, Post, HttpCode, Body, UsePipes, ValidationPipe, UseGuards} from '@nestjs/common';
import {GuestDto} from "./dto/guest.dto";
import {JwtGuard} from "./guards/jwt.guard";
import {JwtDto} from "./dto/jwt.dto";
import {JwtDtoDecorator} from "./decorators/jwt-dto.decorator";
import {OauthService} from "./oauth.service";
import {ConfigService} from "@nestjs/config";

@Controller('oauth')
export class OauthController {
    constructor(private readonly oauthService: OauthService, private readonly configService: ConfigService) {
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    @Post('token')
    async token(@Body() dto: GuestDto, @JwtDtoDecorator() jwt: JwtDto) {
        return {
            token_type: "Bearer",
            expires_in: Number(this.configService.get('GUEST_USER_ACCESS_TOKEN_TTL')),
            ...await this.oauthService.guestTokens(jwt)
        };
    }
}
