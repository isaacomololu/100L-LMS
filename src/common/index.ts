import { Logger } from '@nestjs/common';

export { BaseController } from './base.controller';
export { BaseService } from './base.service';
export * as config from './config';
const displayName = 'Elearning Platform'
export const logger = new Logger(displayName);
