import _, { camelCase } from 'lodash';
import { IErrors, ILoadersAndErrors, ILoadings } from '@/redux/utils/types';
import { Chat, Message } from '@/redux/store/chat/actions';
import { Auth, User } from '@/redux/store/user/actions';

export const changeShowDialogs: any = (
  dialogs: string[], type: string, isActive: boolean,
) => ({
  ...dialogs,
  [camelCase(type)]: isActive,
});

export const pascalCase = (string: string): any => {
  return _.upperFirst(_.camelCase(string));
};

export const screamSnakeCaseWithSlicingError = (string: string): string => {
  const stringWithoutError = string.slice(0, -5);
  return _.snakeCase(stringWithoutError).toUpperCase();
};

export const getLoaderName = (type: string): string => `is${pascalCase(type)}Loading`;
export const getErrorName = (type: string): string => `${camelCase(type)}Error`;

export const loadersAndErrorsTypes: string[] = [
  Chat.CREATE_CHAT,
  Chat.DELETE_CHAT,
  Chat.DELETE_USER_FROM_CHAT,
  Chat.EDIT_CHAT_NAME,
  Chat.GET_CHAT_PARTICIPANTS,
  Message.GET_MESSAGES,
  Message.SEND_MESSAGE,
  Message.DELETE_MESSAGE,
  Message.EDIT_MESSAGE,
  User.ADD_USER_TO_CHAT,
  User.EDIT_CURRENT_USER,
  Auth.SIGN_IN,
  Auth.SIGN_UP,
  Auth.CHANGE_PASSWORD,
  Auth.CONFIRM_USER,
];

export const getInitialState = (types: string[]): ILoadersAndErrors => {
  const loaders: ILoadings = {};
  const errors: IErrors = {};

  types.forEach(type => {
    loaders[getLoaderName(type)] = false;
    errors[getErrorName(type)] = {
      isError: false,
      textError: '',
    };
  });

  return {
    loaders,
    errors,
  };
};
