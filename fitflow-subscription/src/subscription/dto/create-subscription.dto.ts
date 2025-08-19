import { IsString, IsInt } from 'class-validator';

export class CreateSubscriptionDto {
    @IsInt()
    userId: number;

    @IsString()
    plan: string;
}
