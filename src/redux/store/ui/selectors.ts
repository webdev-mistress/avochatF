import _ from 'lodash';
import { IUI } from '@/redux/store/ui/types';

export const selectIsShowChatSettings = (state: IUI): boolean =>
  _.get(state, ('ui.dialog.chatSettings.isActive'), false);

export const selectIsShowUserSettings = (state: IUI): boolean =>
  _.get(state, ('ui.dialog.isShowUserSettings'), false);

export const selectIsShowLogout = (state: IUI): boolean =>
  _.get(state, ('ui.dialog.isShowLogout'), false);

export const selectIsShowCreateChat = (state: IUI): boolean =>
  _.get(state, ('ui.dialog.isShowCreateChat'), false);
