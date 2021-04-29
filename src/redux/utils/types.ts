import { IUserStore } from '@/redux/store/user/types';
import { IChatStore } from '@/redux/store/chat/types';
import { IUIStore } from '@/redux/store/ui/types';

export interface ILoadings {
  [key: string]: boolean,
}

export interface IErrors {
  [key: string]: {
    isError: boolean,
    textError?: string,
  }
}

export interface ILoadersAndErrors {
  loaders: ILoadings,
  errors: IErrors,
}

export interface IStore {
  user: IUserStore,
  chat: IChatStore,
  ui: IUIStore,
}
