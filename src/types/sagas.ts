import { IChat, IMembersData, IMessage } from '@/types/store/chatActions';
import { ISucceededUserData } from '@/types/store/userActions';

export interface ISignInUserSaga {
  ok: boolean,
  data: {
    accessToken: string,
    userId: number,
    name: string,
    login: string,
    chats: IChat[],
  }
}

export interface ISignUpUserSaga {
  ok: boolean,
  data: ISucceededUserData,
}

export interface IGetMessagesSaga {
  ok: boolean,
  data: IMessage[],
  message: string,
}

export interface ISendMessageSaga {
  ok: boolean,
  data: IMessage,
  message: string,
}

export interface IDeleteMessageSaga {
  ok: true,
  data: {
    deletedMessageId: number,
  }
}

export interface IEditMessageSaga {
  ok: true,
  data: IMessage,
}

export interface ICreateChatSaga {
  ok: boolean,
  data: IChat,
  message: string,
}

export interface IDeleteChatSaga {
  ok: boolean,
  data: {
    deletedChatId: number,
  }
}

export interface IAddUserToChatSaga {
  ok: boolean,
  data: {
    addedChatId: number,
    addedUserId: number,
  }
}

export interface IDeleteUserFromChatSaga {
  ok: boolean,
  data: {
    deletedChatId: number,
    deletedUserId: number,
  }
}

export interface ICkeckMembersSaga {
  ok: boolean,
  data: IMembersData[]
}

export interface IEditChatNameSaga {
  ok: boolean,
  data: {
    name: string,
    id: number,
  }
}

export interface IEditUserSaga {
  ok: boolean,
  data: {
    changedFields: {
      userId: number,
      name?: string,
      login?: string,
      password?: string,
    }
  }
}

export interface ILogoutUserSaga {
  ok: boolean,
}

export interface IEditUserLoginSaga {
  ok: boolean,
  data: {
    changedFields: {
      login: string,
    }
  }
}
