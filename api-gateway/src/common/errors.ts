import { HttpException, HttpStatus } from '@nestjs/common';

export const httpErrors = {
  notFound: (message: string = 'Data not found', error: any = null) => {
    return new HttpException(
      {
        success: false,
        status: HttpStatus.NOT_FOUND,
        message,
        error: error || 'data_not_found',
      },
      HttpStatus.NOT_FOUND,
    );
  },
  badRequest: (message: string = 'Invalid data', error: any = null) => {
    return new HttpException(
      {
        success: false,
        status: HttpStatus.BAD_REQUEST,
        message,
        error: error || 'bad_request',
      },
      HttpStatus.BAD_REQUEST,
    );
  },
  serverError: (message: string = 'Server error', error: any = null) => {
    return new HttpException(
      {
        success: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
        error: error || 'INTERNAL_SERVER_ERROR',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  },
};

export const response = {
  single: (message: string = '', data: any = {}) => {
    return {
      success: true,
      message,
      data,
    };
  },
  list: (message: string = '', data: any = []) => {
    return {
      success: true,
      message,
      data,
    };
  },
};
