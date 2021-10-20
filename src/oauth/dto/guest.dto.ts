import {Equals} from 'class-validator'

export class GuestDto {
    @Equals('guest_user', {
        message: 'The provided authorization grant is invalid.',
    })
    grant_type: string;
}
