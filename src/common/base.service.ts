import { Injectable } from '@nestjs/common';
import { logger } from '.';
import { ServiceResponse } from './interfaces';

@Injectable()
export class BaseService {
  protected HandleError(error: Error, report = false) {
    if (report) {
      this.ReportError(error);
    }

    return {
      errMessage: error.message || 'Internal server error',
      isError: true,
      data: null,
      error,
    };
  }

  protected Results<T>(data?: T): ServiceResponse<T> {
    return {
      data: data as T,
      isError: false,
      errMessage: undefined,
    };
  }

  public async ReportError(error: Error) {
    logger.error(error);
  }
}
