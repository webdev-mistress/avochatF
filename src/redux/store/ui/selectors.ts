import _ from 'lodash';
import { IStore } from '@/redux/utils/types';

export const selectIsShowChatSettings = (state: IStore): boolean =>
  _.get(state, ('ui.dialog.chatSettings.isActive'), false);

export const selectIsShowUserSettings = (state: IStore): boolean =>
  _.get(state, ('ui.dialog.isShowUserSettings'), false);

export const selectIsShowLogout = (state: IStore): boolean =>
  _.get(state, ('ui.dialog.isShowLogout'), false);

export const selectIsShowCreateChat = (state: IStore): boolean =>
  _.get(state, ('ui.dialog.isShowCreateChat'), false);
