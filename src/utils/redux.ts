import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

const TYPES = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const selectWithoutChanges = (state: any) => state;

export const getApiActions = (name: string): any => {
  const actionRequest = actionCreator(`${name}_${TYPES.REQUEST}`);
  const actionSuccess = actionCreator(`${name}_${TYPES.SUCCESS}`);
  const actionError = actionCreator(`${name}_${TYPES.ERROR}`);

  return [actionRequest, actionSuccess, actionError];
};
