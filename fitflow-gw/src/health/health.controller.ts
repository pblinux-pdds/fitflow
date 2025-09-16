import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { HealthCheck, HealthCheckService, MicroserviceHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private microservice: MicroserviceHealthIndicator, 
    ) { }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.microservice.pingCheck(
                'user-signup',
                { 
                    transport: Transport.TCP, 
                    options: {
                        host: process.env.SIGNUP_HOST,
                        port: process.env.SIGNUP_PORT ? parseInt(process.env.SIGNUP_PORT) : 3001,
                    } 
                }
            ),
            () => this.microservice.pingCheck(
                'user-subscription',
                {
                    transport: Transport.TCP,
                    options: {
                        host: process.env.SUBSCRIPTION_HOST,
                        port: process.env.SUBSCRIPTION_PORT ? parseInt(process.env.SUBSCRIPTION_PORT) : 3002,
                    }
                }
            ),
        ]);
    }
}
