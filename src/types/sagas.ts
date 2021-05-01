// import { IChat, IMemberInfo, IMessage } from '@/redux/store/chat/utils';
// import { IUserProfileData, IUserProfileDataWithChats } from '@/redux/store/user/utils';
//
// export interface ISignInUserSaga {
//   ok: boolean,
//   data: IUserProfileDataWithChats,
// }
//
// export interface ISignUpUserSaga {
//   ok: boolean,
//   data: IUserProfileData,
// }
//
// export interface IGetMessagesSaga {
//   ok: boolean,
//   data: IMessage[],
//   message: string,
// }
//
// export interface ISendMessageSaga {
//   ok: boolean,
//   data: IMessage,
//   message: string,
// }
//
// export interface IDeleteMessageSaga {
//   ok: true,
//   data: {
//     deletedMessageId: number,
//   }
// }
//
// export interface IEditMessageSaga {
//   ok: true,
//   data: IMessage,
// }
//
// export interface ICreateChatSaga {
//   ok: boolean,
//   data: IChat,
//   message: string,
// }
//
// export interface IDeleteChatSaga {
//   ok: boolean,
//   data: {
//     deletedChatId: number,
//   }
// }
//
// export interface IAddUserToChatSaga {
//   ok: boolean,
//   data: {
//     addedChatId: number,
//     addedUserId: number,
//   }
// }
//
// export interface IDeleteUserFromChatSaga {
//   ok: boolean,
//   data: {
//     deletedChatId: number,
//     deletedUserId: number,
//   }
// }
//
// export interface ICkeckMembersSaga {
//   ok: boolean,
//   data: IMemberInfo[]
// }
//
// export interface IEditChatNameSaga {
//   ok: boolean,
//   data: {
//     name: string,
//     id: number,
//     userOwnerId: number,
//   }
// }
//
// export interface IEditUserSaga {
//   ok: boolean,
//   data: {
//     changedFields: {
//       userId: number,
//       name?: string,
//       login?: string,
//       password?: string,
//     }
//   }
// }
//
// export interface ILogoutUserSaga {
//   ok: boolean,
// }
//
// export interface IEditUserLoginSaga {
//   ok: boolean,
//   data: {
//     changedFields: {
//       login: string,
//     }
//   }
// }
//
// export interface IChangePasswordSaga {
//   ok: boolean,
// }
export const a = 10;
