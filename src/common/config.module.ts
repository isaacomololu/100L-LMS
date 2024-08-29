// import { Module, Global } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AppConfig } from './config';

// @Global()
// @Module({
//     imports: [ConfigModule.forRoot({ isGlobal: true })],
//     providers: [
//         {
//             provide: AppConfig,
//             useFactory: (configService: ConfigService) => new AppConfig(configService),
//             inject: [ConfigService],
//         },
//     ],
//     exports: [AppConfig],
// })
// export class AppConfigModule { }