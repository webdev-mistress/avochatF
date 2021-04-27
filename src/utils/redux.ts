import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

const TYPES = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
};

export const selectWithoutChanges = (state: any): any => state;

export const getApiActions = (name: string): any => {
  const actionRequest = actionCreator(`${name}_${TYPES.REQUEST}`);
  const actionSuccess = actionCreator(`${name}_${TYPES.SUCCESS}`);

  return [actionRequest, actionSuccess];
};
