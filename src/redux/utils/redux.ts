import { camelCase } from 'lodash';

export const changeShowDialogs: any = (
  dialogs: string[], type: string, isActive: boolean,
) => ({
  ...dialogs,
  [camelCase(type)]: isActive,
});
