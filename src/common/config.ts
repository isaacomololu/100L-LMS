// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { plainToInstance, Transform } from "class-transformer";
// import { validate, IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";

// @Injectable()
// export class AppConfig {
//     constructor(private configService: ConfigService) { }
//     // @IsNotEmpty()
//     // @IsString()
//     // get SESSION_SECRET(): string {
//     //   return this.configService.get<string>('SESSION_SECRET');
//     // }

//     @IsNotEmpty()
//     @IsString()
//     get JWT_SECRET(): string {
//         return this.configService.get<string>('JWT_SECRET');
//     }
// }



// class Config {
//     @IsNotEmpty()
//     @IsString()
//     DB_URL: string;

//     @IsNotEmpty()
//     @IsString()
//     NODE_ENV: string;

//     @Transform(({ value }) => JSON.parse(value))
//     @IsOptional()
//     @IsBoolean()
//     EMPTY_DB = false;

//     @Transform(({ value }) => JSON.parse(value))
//     @IsOptional()
//     @IsBoolean()
//     DB_SSL = false;

//     @IsNotEmpty()
//     @IsString()
//     SESSION_SECRET: string;

//     @IsNotEmpty()
//     @IsString()
//     JWT_SECRET: string;

//     @IsNotEmpty()
//     @IsString()
//     BASE_URL: string;
// }
// export let config: Config;

// export const setupConfig = async () => {
//     config = plainToInstance(Config, process.env);
//     const [error] = await validate(config, { whitelist: true });
//     if (error) return error;
// };