import { isNumber } from 'lodash';

export const getErrorMessage = error => isNumber(error) ? `Error: ${error}` : error;
