import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secret-key',
            signOptions: { expiresIn: '1h' },
        })
    ],
    providers: [JwtStrategy],
})
export class AuthModule {}
