import { isNumber } from 'lodash';

export const getErrorMessage = (error: any): any => isNumber(error)
  ? `Error: ${error}`
  : error;
